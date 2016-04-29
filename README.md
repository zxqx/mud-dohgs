# Mud Dohgs

A lightweight API and front end for viewing the Mud Dohgs softball schedule. This application scrapes and parses the Austin Parks & Recreation site for the team schedule and displays it in a mobile-friendly format.

[![View Schedule](https://img.shields.io/badge/view-schedule-b49925.svg)](http://muddohgs.com/)

## Requirements

+ NodeJS

## Tech Stack

* [express](http://expressjs.com/) - Server HTTP framework
* [react](https://facebook.github.io/react/) - View layer
* [redux](https://github.com/reactjs/redux) - Frontend state management
* [react-css-modules](https://github.com/gajus/react-css-modules) - Scoped CSS modules
* [babel](https://babeljs.io/) - ES6/JSX compiler
* [webpack](https://webpack.github.io/) - Module bundler

## Setup

Install dependencies:

```sh
$ npm install
```

Start the server:

```sh
$ npm start
```

To run the server in release mode, set the environment variable `NODE_ENV=production`

## Release

Generate a release build in `dist`:

```sh
$ npm run build
```
