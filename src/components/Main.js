import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import cssModules from 'react-css-modules';
import baseStyles from '../style/index.css';

@cssModules(baseStyles)
export default class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const { styles } = this.props;

    return (
      <div className={styles.container}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
