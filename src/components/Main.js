import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import CSSModules from 'react-css-modules';
import styles from '../style/index.css';

@CSSModules(styles)
export default class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div styleName='container'>
        <Header />
        {/* this will render the child routes */}
        {this.props.children}
      </div>
    );
  }
}
