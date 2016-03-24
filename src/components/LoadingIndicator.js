import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from '../style/index.css';

@cssModules(styles)
export default class LoadingIndicator extends Component {
  render() {
    return (
      <div styleName='loading-indicator'>Loading schedule...</div>
    );
  }
}
