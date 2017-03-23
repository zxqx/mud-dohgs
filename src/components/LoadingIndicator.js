import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from '../style/index.css';

@cssModules(styles)
export default class LoadingIndicator extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    const { message } = this.props;

    return (
      <div>
        <div styleName='loader'></div>
        <div styleName='loading-indicator'>{message}</div>
      </div>
    );
  }
}
