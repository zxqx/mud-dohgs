import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import baseStyles from '../style/index.css';

@cssModules(baseStyles)
export default class GamesErrorMessage extends Component {
  render() {
    const { scheduleUrl } = this.props;

    return (
      <div styleName='error-message'>
        <span>Could not load schedule.</span>
        <a styleName='schedule-url' href={scheduleUrl}>View the schedule on Austin Parks &amp; Recreation</a>
      </div>
    );
  }
}
