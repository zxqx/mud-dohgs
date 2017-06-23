const config = require('./config.js');

module.exports = fetchRoster;

/**
 * Retrieve the current roster from firebase
 */
function fetchRoster() {
  const ref = config.db.ref('roster');

  return new Promise((resolve, reject) => {
    ref.on('value', snapshot => resolve(snapshot.val()));
  });
}
