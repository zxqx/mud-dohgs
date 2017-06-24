const config = require('./config.js');

module.exports = fetchScheduleUrl;

/**
 * Retrieve the current schedule URL from firebase
 */
function fetchScheduleUrl() {
  const ref = config.db.ref('schedule-url');

  return new Promise((resolve, reject) => {
    ref.on('value', snapshot => resolve(snapshot.val().url));
  });
}
