const twilio = require('twilio');
const fetch = require('node-fetch');
const moment = require('moment');
const dotenv = require('dotenv');
const fetchSchedule = require('../server/schedule.js');
const fetchStandings = require('../server/standings.js');
const fetchRoster = require('../server/roster.js');

dotenv.load();

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const TOMORROW = moment().startOf('day').subtract(3, 'days');

function fetchWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=78741,us&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`)
  .then(res => res.json());
}

Promise.all([
  fetchSchedule(),
  fetchStandings(),
  fetchRoster(),
  fetchWeather()
])
.then(([schedule, standings, roster, weather]) => {
  const gameTomorrow = schedule.data
    .find(game => moment(game.date).isSame(TOMORROW))

  const { away_team, home_team, time, location } = gameTomorrow;
  const date = moment(gameTomorrow.date).format('MMMM D');
  const awayTeamStanding = standings.data.find(standing => standing.team === away_team);
  const homeTeamStanding = standings.data.find(standing => standing.team === home_team);
  const dugout = home_team === 'Mud Dohgs' ? 'Home' : 'Away';
  const forecast = weather.list
    .find(slot => moment(slot.dt_txt) > moment(gameTomorrow.date));

  roster.forEach(player => {
    if (player.phone) {
      client.messages.create({
        to: player.phone,
        from: '+13134668346',
        body: `
Mud Dohgs game tomorrow, ${date} at ${time}\n
${away_team} (${awayTeamStanding.wins}-${awayTeamStanding.losses}) @ ${home_team} (${homeTeamStanding.wins}-${homeTeamStanding.losses})
${location} - ${dugout}

Forecast is ${forecast.weather[0].description}, ${Math.round(forecast.main.temp)} degrees

- Mudbot (woof woof)`
      })
      .then((message) => console.log(message.sid));
    }
  });
});
