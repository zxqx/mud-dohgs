const firebase = require('firebase');

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth;
const db = firebase.database();

module.exports = { auth, provider, db };
