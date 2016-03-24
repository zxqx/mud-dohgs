import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGameList } from '../actions/games';
import LoadingIndicator from '../components/LoadingIndicator';
import GamesErrorMessage from '../components/GamesErrorMessage';
import GameList from '../components/GameList';

@connect(state => ({
  games: state.games
}))
export default class SchedulePage extends Component {
  static propTypes = {
    games: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.dispatch(getGameList());
  }

  render() {
    const { games } = this.props;

    if (games.loading) {
      return <LoadingIndicator />;
    }

    if (games.failed) {
      return <GamesErrorMessage url={games.raw} />;
    }

    return <GameList games={games.data} />;
  }
}
