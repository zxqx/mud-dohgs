import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { auth, provider } from '../config/auth';
import { authenticateUser, updateUser } from '../actions/user';
import Header from './Header';
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
    const rootPath = this.getRootPath();

    if (rootPath !== 'logout') {
      this.props.dispatch(authenticateUser());
    }
  }

  getRootPath() {
    return this.props.location.pathname.split('/')[1];
  }

  render() {
    const { user, styles } = this.props;

    const rootPath = this.getRootPath();

    if (!user.attemptedAuthentication && rootPath !== 'logout') {
      return <div>Attempting login...</div>;
    }

    return (
      <div className={styles.container}>
        <Header
          path={this.getRootPath()}
          user={user}
        />
        {this.props.children}
      </div>
    );
  }
}
