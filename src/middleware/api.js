import 'whatwg-fetch';
import Firebase from 'firebase';
import { camelizeKeys } from 'humps';
import moment from 'moment';

const REMOTE_DATA_STORE_ROOT = 'https://mud-dohgs.firebaseio.com';

export async function fetchGameList() {
  const res = await fetch('/api/schedule');

  if (!res.ok) {
    return Promise.reject();
  }

  let data = await res.json();

  data = camelizeKeys(data);
  data.data.forEach(d => d.date = moment(d.date));

  return data;
}

export async function fetchScheduleUrl() {
  const res = await fetch('/api/schedule/url');

  if (!res.ok) {
    return Promise.reject();
  }

  return await res.json();
}

export async function fetchStandings() {
  const res = await fetch('/api/standings');

  if (!res.ok) {
    return Promise.reject();
  }

  return await res.json();
}

export async function fetchRoster() {
  const res = await fetch('/api/roster');

  if (!res.ok) {
    return Promise.reject();
  }

  return await res.json();
}

export async function setScheduleUrl(url, password) {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/schedule-url`);

  return new Promise((resolve, reject) => {
    ref.authWithPassword({
      email: 'SbJoZgk5Bn@tN9kZiIzUJ.com',
      password: password
    }, (error, authData) => {
      if (error) {
        reject();
      }
      else {
        ref.child('url').set(url);
        resolve(url);
      }
    });
  });
}

export async function setRoster(roster) {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/roster`);

  return new Promise((resolve, reject) => {
    ref.authWithPassword({
      email: 'SbJoZgk5Bn@tN9kZiIzUJ.com',
      password: 'bigtits8'
    }, (error, authData) => {
      if (error) {
        reject();
      }
      else {
        ref.set(roster);
        resolve(roster);
      }
    });
  });
}
