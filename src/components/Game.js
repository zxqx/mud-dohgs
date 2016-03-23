import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import styles from '../style/games.css';

@CSSModules(styles)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  render() {
    const { game, styles } = this.props;
    const { awayScore, homeScore } = game;

    const today = moment().startOf('day');
    const gameStyle = game.date.startOf('day').diff(today) ? 'game' : 'game-today';

    const awayTeamStyle = awayScore > homeScore ? 'schedule-away-win' : 'schedule-away';
    const homeTeamStyle = homeScore > awayScore ? 'schedule-home-win' : 'schedule-home';

    const threeDaysAgo = today.subtract(3, 'days').startOf('day');
    const noResults = awayScore === undefined && homeScore === undefined;
    const gameStatus = noResults && game.date < threeDaysAgo ? 'postponed' : null;
    const teamDugout = game.homeTeam === 'Mud Dohgs' ? 'Home' : 'Away';

    return (
      <li styleName={gameStyle}>
        <div styleName={gameStatus}>
          <span styleName='schedule-date'>
            <span styleName='schedule-month'>{game.date.format('MMM')}</span>
            <span styleName='schedule-day'>{game.date.format('D')}</span>
          </span>

          <span>
            <span styleName='schedule-time'>@ {game.time}</span>
            <span styleName={awayTeamStyle}>{game.awayTeam} {game.awayScore}</span>
            <span styleName={homeTeamStyle}> @ {game.homeTeam} {game.homeScore}</span>
            <div>
              <span styleName='schedule-location'>{game.location} -&nbsp;</span>
              <span styleName='schedule-team-dugout'>
                {teamDugout}
              </span>
            </div>
          </span>
        </div>
      </li>
    );
  }
}
