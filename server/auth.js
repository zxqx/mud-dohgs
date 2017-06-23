const config = require('./config.js');

module.exports = authenticateUser;

/**
 * Redirect the user to Google login
 */
function authenticateUser() {
  config.auth.signInWithRedirect(config.provider);
}
