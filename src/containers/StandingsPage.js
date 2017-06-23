import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getStandings } from '../actions/standings';
import { getScheduleUrl } from '../actions/schedule-url';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import StandingsTable from '../components/StandingsTable';

@connect(state => ({
  standings: state.standings,
  scheduleUrl: state.scheduleUrl
}))
export default class StandingsPage extends Component {
  static propTypes = {
    standings: PropTypes.object.isRequired,
    scheduleUrl: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(getStandings());
    this.props.dispatch(getScheduleUrl());
  }

  render() {
    const { standings, scheduleUrl } = this.props;

    if (standings.loading) {
      return <LoadingIndicator message="Loading standings..." />;
    }

    if (standings.failed) {
      return (
        <ErrorMessage
          message="Could not load standings."
          scheduleUrl={scheduleUrl.scheduleUrl}
        />
      );
    }

    return <StandingsTable standings={standings.data} />;
  }
}
