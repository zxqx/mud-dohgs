import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { authenticateUser, updateUser } from '../actions/user';
import Header from './Header';
import LoadingIndicator from './LoadingIndicator';
import baseStyles from '../style/index.css';

@connect(state => ({
  user: state.user
}))
@cssModules(baseStyles)
export default class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  componentWillMount() {
    if (!this.isLogoutPage()) {
      this.props.dispatch(authenticateUser());
    }
  }

  getRootPath() {
    return this.props.location.pathname.split('/')[1];
  }

  isLogoutPage() {
    return this.getRootPath() === 'logout';
  }

  render() {
    const { user, styles } = this.props;

    const rootPath = this.getRootPath();

    if (!user.attemptedAuthentication && !this.isLogoutPage()) {
      return (
        <div className={styles.baseLoader}>
          <LoadingIndicator message="Loading..." />
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <Header
          path={rootPath}
          user={user}
        />
        {this.props.children}
      </div>
    );
  }
}
