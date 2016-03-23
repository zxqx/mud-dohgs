import moment from 'moment';

export async function fetchGameList() {
  const res = await fetch('/api/schedule');

  if (!res.ok) {
    Promise.reject(res);
  }

  let data = await res.json();

  data.data.forEach(d => d.date = moment(d.date, 'ddd MM/DD/YYYY'));

  return data;
}
