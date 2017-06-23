const firebase = require('firebase');
const dotenv = require('dotenv');

dotenv.load();

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = firebase.database();

module.exports = { db };
