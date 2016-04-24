import React, { Component } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import headerStyles from '../style/header.css';
import toasty from 'mk-toasty';

@cssModules(headerStyles)
export default class Header extends Component {
  componentWillMount() {
    toasty().trigger();
  }

  render() {
    const { styles } = this.props;

    return (
      <div className={styles.navbar}>
        <div styleName='navbar-brand'>
          <Link to='/'>
            <span styleName='navbar-team'>Mud Dohgs</span>
            <span styleName='navbar-section'>Schedule</span>
          </Link>
        </div>
      </div>
    );
  }
}
