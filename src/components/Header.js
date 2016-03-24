import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import headerStyles from '../style/header.css';

@cssModules(headerStyles)
export default class Header extends Component {
  render() {
    const { styles } = this.props;

    return (
      <div className={styles.navbar}>
        <div styleName='navbar-brand'>
          <span styleName='navbar-team'>Mud Dohgs</span>
          <span styleName='navbar-section'>Schedule</span>
        </div>
      </div>
    );
  }
}
