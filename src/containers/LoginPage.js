import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { auth, provider } from '../config/auth';

export default class LoginPage extends Component {
  componentWillMount() {
    this._unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        browserHistory.push('/admin');
      }
      else {
        auth().signInWithRedirect(provider);
      }
    });
  }

  render() {
    return (
      <h1>Redirecting...</h1>
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
}
