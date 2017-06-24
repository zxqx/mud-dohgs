import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getRoster, setRoster } from '../actions/roster';
import RosterForm from '../components/RosterForm';
import LoadingIndicator from '../components/LoadingIndicator';

@connect(state => ({
  roster: state.roster
}))
export default class RosterPage extends Component {
  componentDidMount() {
    this.props.dispatch(getRoster());
  }

  render() {
    const { roster } = this.props;

    if (roster.loading) {
      return <LoadingIndicator message="Loading roster..." />;
    }

    return (
      <RosterForm
        roster={roster.data}
        onSubmit={data => {
          return this.props.dispatch(setRoster(data.players));
        }}
      />
    );
  }
}
