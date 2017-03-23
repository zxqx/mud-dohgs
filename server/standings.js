const Firebase = require('firebase');
const curl = require('curlrequest');
const cheerio = require('cheerio');
const htmlToJson = require('html-to-json');
const moment = require('moment');
const fetchScheduleUrl = require('./schedule-url.js');

const STANDINGS_TABLE_SELECTOR = '#ctl00_OrgContentUnit_standingsGrid_ctl00 tbody';

module.exports = fetchStandings;

/**
 * Get the current schedule URL
 * Hit the page and scrape HTML
 * Convert the HTML to JSON structure
 * @return {Promise}
 */
function fetchStandings() {
  return fetchScheduleUrl()
    .then(scheduleUrl => scrapeHtmlFromUrl(scheduleUrl))
    .then(html => convertStandingsToJson(html(STANDINGS_TABLE_SELECTOR).html()))
    .then(standingsJson => ({ data: standingsJson }));
}

/**
 * Scrape the HTML contents of the schedule page
 * @param {string} url
 * @return {Promise<object>}
 */
function scrapeHtmlFromUrl(url)
{
  return new Promise((resolve, reject) => {
    curl.request({ url: url }, (err, res) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(cheerio.load(res));
      }
    });
  });
}

/**
 * Convert the HTML string to a JSON structure
 * @param {object} schedule
 * @return {Promise<array>}
 */
function convertStandingsToJson(schedule)
{

  return htmlToJson.parse(schedule, ['tr[id*="ctl00_OrgContentUnit_standingsGrid_ctl00"] td', $standings => {
    return $standings.text().trim();
  }])
  .then(items => getStandingsFromItems(items).map(s => formatStanding(s)));
}

/**
 * Split out raw schedule array data into games
 * @param {array} items
 * @return {array}
 */
function getStandingsFromItems(items) {
  var standings = [];

  var rowLength = items.length / 12;
  for (var i=0; i < rowLength; i++) {
    standings.push(items.splice(0, 12));
  }

  return standings;
}

/**
 * Do some basic formatting and add extra helpful props
 * @param {object} s
 * @return {object}
 */
function formatStanding(s) {
  var standing = {};

  standing.place = s[0];
  standing.team = s[1];
  standing.wins = s[2];
  standing.losses = s[3];
  standing.runDifferential = s[9] > 0 ? `+${s[9]}` : s[9];

  return standing;
}
