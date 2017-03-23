import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import baseStyles from '../style/index.css';

@cssModules(baseStyles)
export default class ErrorMessage extends Component {
  render() {
    const { message, scheduleUrl } = this.props;

    return (
      <div styleName='error-message'>
        <span>{message}</span>
        <a styleName='schedule-url' href={scheduleUrl}>View on Austin Parks &amp; Recreation</a>
      </div>
    );
  }
}
