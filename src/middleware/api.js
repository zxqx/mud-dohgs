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
  data.data.forEach(d => d.date = moment(d.date, 'ddd MM/DD/YYYY'));

  return data;
}

export async function updateScheduleUrl(url) {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/schedule-url`);
  ref.child('url').set(url);
}

export async function getScheduleUrl() {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/schedule-url`);

  ref.on('value', snapshot => console.log(snapshot.val()),
    error => console.log(error));
}
