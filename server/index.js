/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fetchSchedule = require('./schedule');
const fetchScheduleUrl = require('./schedule-url');

const app = express();
const port = process.env.PORT || 3000;

var config = process.env.NODE_ENV === 'production'
  ? config = require('../webpack.config.production')
  : require('../webpack.config');

const compiler = webpack(config);

var bundler = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  proxy: {
    '*/api/*': {
      target: 'http://localhost:8080',
      secure: false
    }
  },
  historyApiFallback: true
});

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/schedule', (req, res) => {
  fetchSchedule().then(schedule => res.send(schedule));
});

app.get('/api/schedule/url', (req, res) => {
  fetchScheduleUrl().then(scheduleUrl => res.send({ scheduleUrl }));
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: process.env.PWD + '/dist' });
});

app.listen(8080);
bundler.listen(port);
