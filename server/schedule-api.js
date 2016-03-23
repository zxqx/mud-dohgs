const curl = require('curlrequest');
const cheerio = require('cheerio');
const htmlToJson = require('html-to-json');
const moment = require('moment');

const SCHEDULE_URL = 'http://www.teamsideline.com/Org/StandingsResults.aspx?d=xRIu3qqX6IiJhYMtStQM13QZD5DztI3Tvequts2hASiE1qGPloCO87eZyrOLYZQibhUCMiC0XyY%3d';

module.exports = function scheduleApi(res) {
  scrapeHtmlFromUrl(SCHEDULE_URL)
    .then((html) => {
      var schedule = html('#ctl00_OrgContentUnit_ScheduleGrid_ctl00 tbody').html();
      return convertScheduleToJson(schedule);
    })
    .then((scheduleJson) => {
      res.send({ data: scheduleJson, raw: SCHEDULE_URL });
    });
}

/**
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

function convertScheduleToJson(schedule)
{
  return htmlToJson.parse(schedule, ['tr[id*="ScheduleGrid"] td', function($schedule) {
    return $schedule.text().trim();
  }])
  .then(function(items) {
    var games = [];

    var timesToSplice = items.length / 5;
    for (var i=0; i < timesToSplice; i++) {
      games.push(items.splice(0, 5));
    }

    var gamesFormatted = [];
    games.forEach(function(g) {
      var game = {};

      // TODO - Figure out a better way to infer the year
      game.date = g[0] + '/' + moment().format('YYYY');
      game.time = g[1];
      game.awayTeam = g[2].replace(/\s\d+/g, '').trim();
      game.homeTeam = g[3].replace(/\s\d+/g, '').trim();

      var awayScore = g[2].match(/\d+$/);
      var homeScore = g[3].match(/\d+$/);

      if (awayScore && !isNaN(awayScore[0])) {
        game.awayScore = parseInt(awayScore[0]);
        game.homeScore = parseInt(homeScore[0]);
      }

      game.location = g[4];

      gamesFormatted.push(game);
    });

    return gamesFormatted;
  });
}

