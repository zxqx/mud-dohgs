import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Header from '../components/Header';
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
        <Header path={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}
