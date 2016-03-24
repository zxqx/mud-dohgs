import { camelizeKeys } from 'humps';
import moment from 'moment';

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
