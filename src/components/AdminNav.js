import React, { Component } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from '../style/admin.css';

@cssModules(styles)
export default class AdminNav extends Component {
  render() {
    const { path, styles } = this.props;

    return (
      <ul styleName='sub-navbar'>
        <li>
          <Link
            to='/admin/roster'
            styleName={path === 'roster' ? 'sub-navbar-link-active' : 'sub-navbar-link'}
          >
            Roster
          </Link>
        </li>

        <li>
          <Link
            to='/admin/schedule-url'
            styleName={path === 'schedule-url' ? 'sub-navbar-link-active' : 'sub-navbar-link'}
          >
            Schedule URL
          </Link>
        </li>
      </ul>
    );
  }
}
