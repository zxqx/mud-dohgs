import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateScheduleUrl, updateScheduleUrlRequestFailure, clearScheduleUrlState } from '../actions/schedule-url';
import ScheduleUrlForm from '../components/ScheduleUrlForm';

@connect(state => ({
  scheduleUrl: state.scheduleUrl
}))
export default class ScheduleUrlPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    scheduleUrl: PropTypes.object.isRequired
  };

  render() {
    const { scheduleUrl, dispatch } = this.props;

    return (
      <ScheduleUrlForm
        onSubmit={(url, password) => dispatch(updateScheduleUrl(url, password))}
        onFailure={() => dispatch(updateScheduleUrlRequestFailure())}
        scheduleUrl={scheduleUrl}
      />
    )
  }

  componentWillUnmount() {
    this.props.dispatch(clearScheduleUrlState());
  }
}
