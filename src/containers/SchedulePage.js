import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGameList, getScheduleUrl } from '../actions/games';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import GameList from '../components/GameList';

@connect(state => ({
  games: state.games
}))
export default class SchedulePage extends Component {
  static propTypes = {
    games: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(getGameList());
    this.props.dispatch(getScheduleUrl());
  }

  render() {
    const { games } = this.props;

    if (games.loadingGames) {
      return <LoadingIndicator message="Loading schedule..." />;
    }

    if (games.failed) {
      return (
        <ErrorMessage
          message="Could not load schedule."
          scheduleUrl={games.scheduleUrl}
        />
      );
    }

    return <GameList games={games.data} />;
  }
}
