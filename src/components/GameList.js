import React, { Component, PropTypes } from 'react';
import Game from './Game';
import cssModules from 'react-css-modules';
import gamesStyles from '../style/games.css';

@cssModules(gamesStyles)
export default class GameList extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired
  };

  render() {
    const { games } = this.props;

    return (
      <ol styleName='game-list'>
        {games.map((game, index) =>
          <Game key={index} game={game} />
        )}
      </ol>
    );
  }
}
