/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fetchSchedule = require('./schedule');
const fetchScheduleUrl = require('./schedule-url');
const fetchStandings = require('./standings');
const fetchRoster = require('./roster');

const app = express();
const port = process.env.PORT || 3000;

var config = process.env.NODE_ENV === 'production'
  ? config = require('../webpack.config.production')
  : require('../webpack.config');

app.get('/api/schedule', (req, res) => {
  fetchSchedule().then(schedule => res.send(schedule));
});

app.get('/api/schedule/url', (req, res) => {
  fetchScheduleUrl().then(scheduleUrl => res.send({ scheduleUrl }));
});

app.get('/api/standings', (req, res) => {
  fetchStandings().then(standings => res.send(standings));
});

app.get('/api/roster', (req, res) => {
  fetchRoster().then(roster => res.json(roster));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PWD + '/dist'));

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: process.env.PWD + '/dist' });
  });

  app.listen(port);
}
else {
  const compiler = webpack(config);

  var bundler = new WebpackDevServer(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
    proxy: {
      '**/api/**': {
        target: 'http://localhost:8080',
        secure: false
      }
    },
    historyApiFallback: true
  });

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: process.env.PWD + '/dist' });
  });

  app.listen(8080);
  bundler.listen(port);
}
