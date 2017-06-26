import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { auth, provider } from '../config/server';
import LoadingIndicator from '../components/LoadingIndicator';

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
      <LoadingIndicator message="Redirecting..." />
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
}
