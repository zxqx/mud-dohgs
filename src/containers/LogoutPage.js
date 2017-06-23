import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import LoadingIndicator from '../components/LoadingIndicator';

@connect()
export default class LogoutPage extends Component {
  componentWillMount() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <LoadingIndicator message="Logging out..." />
    );
  }
}
