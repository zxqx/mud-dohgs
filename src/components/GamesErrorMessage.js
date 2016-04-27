import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import baseStyles from '../style/index.css';

@cssModules(baseStyles)
export default class GamesErrorMessage extends Component {
  render() {
    return (
      <div styleName='error-message'>
        Could not load schedule.
      </div>
    );
  }
}
