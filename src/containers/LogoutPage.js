import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';

@connect()
export default class LogoutPage extends Component {
  componentWillMount() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <h1>Logging out...</h1>
    );
  }
}
