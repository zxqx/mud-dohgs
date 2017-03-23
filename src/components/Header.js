import React, { Component } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import headerStyles from '../style/header.css';

@cssModules(headerStyles)
export default class Header extends Component {
  render() {
    const { styles } = this.props;

    return (
      <div className={styles.navbar}>
        <div styleName='navbar-brand'>
          <Link to='/'>
            <span styleName='navbar-team'>Mud Dohgs</span>
          </Link>

          <span styleName='navbar-section'>
            <Link to='/' styleName='navbar-link'>Schedule</Link>
            <Link to='/standings' styleName='navbar-link'>Standings</Link>
          </span>
        </div>
      </div>
    );
  }
}
