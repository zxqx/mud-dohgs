import React, { Component, PropTypes } from 'react';
import Game from './Game';
import CSSModules from 'react-css-modules';
import styles from '../style/games.css';

@CSSModules(styles)
export default class GameList extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired
  };

  render() {
    const { games, raw, styles } = this.props;

    return (
      <ol styleName='ol'>
        {games.map((game, index) =>
          <Game key={index} game={game} raw={raw} />
        )}
      </ol>
    )
  }
}
