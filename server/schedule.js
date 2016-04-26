const Firebase = require('firebase');
const curl = require('curlrequest');
const cheerio = require('cheerio');
const htmlToJson = require('html-to-json');
const moment = require('moment');

const REMOTE_DATA_STORE_ROOT = 'https://mud-dohgs.firebaseio.com';
const GAME_TABLE_SELECTOR = '#ctl00_OrgContentUnit_ScheduleGrid_ctl00 tbody';

module.exports = fetchSchedule;

/**
 * Get the current schedule URL
 * Hit the page and scrape HTML
 * Convert the HTML to JSON structure
 * @return {Promise}
 */
function fetchSchedule() {
  return getScheduleUrl()
    .then(scheduleUrl => scrapeHtmlFromUrl(scheduleUrl))
    .then(html => convertScheduleToJson(html(GAME_TABLE_SELECTOR).html()))
    .then(scheduleJson => ({ data: scheduleJson }));
}

/**
 * Retrieve the current schedule URL from firebase
 */
function getScheduleUrl() {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/schedule-url`);

  return new Promise((resolve, reject) => {
    ref.on('value', snapshot => resolve(snapshot.val().url));
  });
}

/**
 * Scrape the HTML contents of the schedule page
 * @param {string} url
 * @return {Promise<object>}
 */
function scrapeHtmlFromUrl(url)
{
  return new Promise(function(resolve, reject) {
    curl.request({ url: url }, function(err, res) {
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
  return htmlToJson.parse(schedule, ['tr[id*="ScheduleGrid"] td', function($schedule) {
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

  game.date = g[0] + '/' + moment().format('YYYY');
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
