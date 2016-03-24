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

export async function setScheduleUrl(url, password) {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/schedule-url`);

  ref.authWithPassword({
    email    : 'SbJoZgk5Bn@tN9kZiIzUJ.com',
    password : password
  }, (error, authData) => {
    if (error) {
      console.log('Login Failed!', error);
    }
    else {
      ref.child('url').set(url);
    }
  });
}
