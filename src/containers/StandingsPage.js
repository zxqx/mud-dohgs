import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getStandings } from '../actions/standings';
import { getScheduleUrl } from '../actions/games';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import StandingsTable from '../components/StandingsTable';

@connect(state => ({
  standings: state.standings,
  games: state.games
}))
export default class StandingsPage extends Component {
  static propTypes = {
    standings: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(getStandings());
    this.props.dispatch(getScheduleUrl());
  }

  render() {
    const { standings, games } = this.props;

    if (standings.loading) {
      return <LoadingIndicator message="Loading standings..." />;
    }

    if (standings.failed) {
      return (
        <ErrorMessage
          message="Could not load standings."
          scheduleUrl={games.scheduleUrl}
        />
      );
    }

    return <StandingsTable standings={standings.data} />;
  }
}
