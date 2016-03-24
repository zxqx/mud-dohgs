import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateScheduleUrl } from '../actions/games';
import ScheduleUrlForm from '../components/ScheduleUrlForm';

@connect(state => ({}))
export default class CoachPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    const { dispatch } = this.props;

    return (
      <ScheduleUrlForm onSubmit={(url) => dispatch(updateScheduleUrl(url))} />
    )
  }
}
