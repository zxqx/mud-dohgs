const Firebase = require('firebase');

const REMOTE_DATA_STORE_ROOT = 'https://mud-dohgs.firebaseio.com';

module.exports = fetchRoster;

/**
 * Retrieve the current roster from firebase
 */
function fetchRoster() {
  const ref = new Firebase(`${REMOTE_DATA_STORE_ROOT}/roster`);

  return new Promise((resolve, reject) => {
    ref.on('value', snapshot => resolve(snapshot.val()));
  });
}
