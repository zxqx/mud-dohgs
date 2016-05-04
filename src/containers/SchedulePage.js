import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGameList, getScheduleUrl } from '../actions/games';
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
    this.props.dispatch(getScheduleUrl());
  }

  render() {
    const { games } = this.props;

    if (games.loadingGames) {
      return <LoadingIndicator />;
    }

    if (games.failed) {
      return <GamesErrorMessage scheduleUrl={games.scheduleUrl} />;
    }

    return <GameList games={games.data} />;
  }
}
