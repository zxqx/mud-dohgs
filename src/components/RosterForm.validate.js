const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default values => {
  const errors = {};

  if (!values.players || !values.players.length) {
    errors.players = { _error: 'At least one player must be entered' };
  }
  else {
    const playersArrayErrors = [];

    values.players.forEach((player, playerIndex) => {
      const playerErrors = {};
      if (!player || !player.name) {
        playerErrors.name = 'Required';
        playersArrayErrors[playerIndex] = playerErrors;
      }

      if (player.email && !EMAIL_PATTERN.test(player.email)) {
        playerErrors.email = 'Invalid email address';
        playersArrayErrors[playerIndex] = playerErrors;
      }
    })

    if (playersArrayErrors.length) {
      errors.players = playersArrayErrors;
    }
  }

  return errors;
}
