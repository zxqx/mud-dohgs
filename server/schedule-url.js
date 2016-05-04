const Firebase = require('firebase');

const REMOTE_DATA_STORE_ROOT = 'https://mud-dohgs.firebaseio.com';

module.exports = fetchScheduleUrl;

/**
 * Retrieve the current schedule URL from firebase
 */
function fetchScheduleUrl() {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/schedule-url`);

  return new Promise((resolve, reject) => {
    ref.on('value', snapshot => resolve(snapshot.val().url));
  });
}
