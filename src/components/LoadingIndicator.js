import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../style/index.css';

@CSSModules(styles)
export default class LoadingIndicator extends Component {
  render() {
    return (
      <div styleName='loading-indicator'>Loading schedule...</div>
    );
  }
}
