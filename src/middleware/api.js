import 'whatwg-fetch';
import { camelizeKeys } from 'humps';
import moment from 'moment';
import config from '../config/auth';

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
  const ref = config.db.ref('schedule-url');

  return new Promise((resolve, reject) => {
    ref.child('url').set(url);
    resolve(url);
  });
}

export async function setRoster(roster) {
  const ref = config.db.ref('roster');

  return new Promise((resolve, reject) => {
    ref.set(roster);
    resolve(roster);
  });
}
