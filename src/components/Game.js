import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../style/games.css';

@CSSModules(styles)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  render() {
    const { game, styles } = this.props;
    const { awayScore, homeScore } = game;

    const awayTeam = awayScore > homeScore ? 'schedule-away-win' : 'schedule-away';
    const homeTeam = homeScore > awayScore ? 'schedule-home-win' : 'schedule-home';

    return (
      <li styleName='li' className='game'>
        <span styleName='schedule-date' className='schedule-date'>
          <span styleName='schedule-month' className='schedule-month'>{game.date.format('MMM')}</span>
          <span styleName='schedule-day' className='schedule-day'>{game.date.format('D')}</span>
        </span>

        <span className='schedule-game-details'>
          <span styleName='schedule-time'>@ {game.time}</span>
          <span styleName={awayTeam}>{game.awayTeam} {game.awayScore}</span>
          <span styleName={homeTeam}> @ {game.homeTeam} {game.homeScore}</span>
          <span styleName='schedule-location' className='schedule-location'>{game.location}</span>
        </span>
      </li>
    );
  }
}
