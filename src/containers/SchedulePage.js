import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getGameList } from '../actions/games';
import { getScheduleUrl } from '../actions/schedule-url';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import GameList from '../components/GameList';

@connect(state => ({
  games: state.games,
  scheduleUrl: state.scheduleUrl.scheduleUrl
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
    const { games, scheduleUrl } = this.props;

    if (games.loading) {
      return <LoadingIndicator message="Loading schedule..." />;
    }

    if (games.failed) {
      return (
        <ErrorMessage
          message="Could not load schedule."
          scheduleUrl={scheduleUrl}
        />
      );
    }

    return <GameList games={games.data} />;
  }
}
