import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { redirectToGoogleLogin } from '../actions/user';
import AdminNav from '../components/AdminNav';

@connect(state => ({
  user: state.user
}))
export default class AdminPage extends Component {
  componentWillMount() {
    const { user } = this.props;

    if (!user.isLoggedIn) {
      this.props.dispatch(redirectToGoogleLogin());
    }

    if (!this.isAdminUser()) {
      browserHistory.push('/');
    }
  }

  isAdminUser() {
    const { user } = this.props;
    return process.env.FIREBASE_ADMIN_USERS.split(',').indexOf(user.email) !== -1;
  }

  getChildPath() {
    return this.props.location.pathname.split('/')[2];
  }

  render() {
    return (
      <div>
        <AdminNav path={this.getChildPath()} />

        {this.props.children}
      </div>
    );
  }
}
