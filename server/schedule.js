const Firebase = require('firebase');
const curl = require('curlrequest');
const cheerio = require('cheerio');
const htmlToJson = require('html-to-json');
const moment = require('moment');
const fetchScheduleUrl = require('./schedule-url.js');

const GAME_TABLE_SELECTOR = '#ctl00_OrgContentUnit_ScheduleGrid_ctl00 tbody';

module.exports = fetchSchedule;

/**
 * Get the current schedule URL
 * Hit the page and scrape HTML
 * Convert the HTML to JSON structure
 * @return {Promise}
 */
function fetchSchedule() {
  return fetchScheduleUrl()
    .then(scheduleUrl => scrapeHtmlFromUrl(scheduleUrl))
    .then(html => convertScheduleToJson(html(GAME_TABLE_SELECTOR).html()))
    .then(scheduleJson => ({ data: scheduleJson }));
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
function convertScheduleToJson(schedule)
{
  return htmlToJson.parse(schedule, ['tr[id*="ScheduleGrid"] td', $schedule => {
    return $schedule.text().trim();
  }])
  .then(items => getGamesFromItems(items).map(g => formatGame(g)));
}

/**
 * Split out raw schedule array data into games
 * @param {array} items
 * @return {array}
 */
function getGamesFromItems(items) {
  var games = [];

  var rowLength = items.length / 5;
  for (var i=0; i < rowLength; i++) {
    games.push(items.splice(0, 5));
  }

  return games;
}

/**
 * Do some basic formatting and add extra helpful props
 * @param {object} g
 * @return {object}
 */
function formatGame(g) {
  var game = {};

  game.date = moment(`${g[0]}/${moment().format('YYYY')}`, 'ddd MM/DD/YYYY').toISOString();
  game.time = g[1];

  game.away_team = g[2].replace(/\sW$|L$|\d+/g, '').trim();
  game.home_team = g[3].replace(/\sW$|L$|\d+/g, '').trim();

  var awayScore = g[2].match(/W$|L$|\d+$/);
  var homeScore = g[3].match(/W$|L$|\d+$/);

  if (awayScore) {
    game.away_score = parseInt(awayScore[0]) ? parseInt(awayScore[0]) : awayScore[0];
  }

  if (homeScore) {
    game.home_score = parseInt(homeScore[0]) ? parseInt(homeScore[0]) : homeScore[0];
  }

  game.location = g[4];

  return game;
}
