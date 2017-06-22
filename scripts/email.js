const nodemailer = require('nodemailer');
const moment = require('moment');
const dotenv = require('dotenv');
const fetchSchedule = require('../server/schedule.js');
const fetchStandings = require('../server/standings.js');
const fetchRoster = require('../server/roster.js');

dotenv.load();

const TOMORROW = moment().startOf('day').subtract(2, 'days');

const smtpConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.MUD_BOT_USER,
    pass: process.env.MUD_BOT_PASS
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

Promise.all([
  fetchSchedule(),
  fetchStandings(),
  fetchRoster()
])
.then(([schedule, standings, roster]) => {
  const gameTomorrow = schedule.data
    .find(game => moment(game.date).isSame(TOMORROW))

  const { away_team, home_team, time, location } = gameTomorrow;
  const date = moment(gameTomorrow.date).format('MMMM D');
  const awayTeamStanding = standings.data.find(standing => standing.team === away_team);
  const homeTeamStanding = standings.data.find(standing => standing.team === home_team);
  const dugout = home_team === 'Mud Dohgs' ? 'Home' : 'Away';

  roster.forEach(player => {
    sendEmail({
      from: 'MudBot <muddohgsbot@gmail.com>',
      to: player.email,
      subject: `Game Today - ${date}, ${time} (${location})`,
      html: `
        ${date}, ${time}<br />
        ${away_team} (${awayTeamStanding.wins}-${awayTeamStanding.losses}) @ ${home_team} (${homeTeamStanding.wins}-${homeTeamStanding.losses})<br />
        ${location} - ${dugout}
      `
    });
  });

});

function sendEmail(emailContents) {
  transporter.sendMail(emailContents, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
