import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateScheduleUrl } from '../actions/games';
import ScheduleUrlForm from '../components/ScheduleUrlForm';

@connect(state => ({
  loading: state.games.loading,
  failed: state.games.failed,
  saved: state.games.saved
}))
export default class CoachPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    failed: PropTypes.bool.isRequired,
    saved: PropTypes.bool.isRequired
  };

  render() {
    const { dispatch, loading, failed, saved } = this.props;

    return (
      <ScheduleUrlForm onSubmit={(url, password) => dispatch(updateScheduleUrl(url, password))} loading={loading} failed={failed} saved={saved} />
    )
  }
}
