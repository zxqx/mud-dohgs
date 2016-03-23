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

    const awayTeamStyle = awayScore > homeScore ? 'schedule-away-win' : 'schedule-away';
    const homeTeamStyle = homeScore > awayScore ? 'schedule-home-win' : 'schedule-home';

    const threeDaysAgo = moment().subtract(3, 'days').startOf('day');
    const noResults = awayScore === null && homeScore === null;
    const status = noResults && game.date < threeDaysAgo ? 'postponed' : null;

    return (
      <li className={styles.game}>
        <div styleName={status}>
          <span styleName='schedule-date'>
            <span styleName='schedule-month'>{game.date.format('MMM')}</span>
            <span styleName='schedule-day'>{game.date.format('D')}</span>
          </span>

          <span>
            <span styleName='schedule-time'>@ {game.time}</span>
            <span styleName={awayTeamStyle}>{game.awayTeam} {game.awayScore}</span>
            <span styleName={homeTeamStyle}> @ {game.homeTeam} {game.homeScore}</span>
            <span styleName='schedule-location'>{game.location}</span>
          </span>
        </div>
      </li>
    );
  }
}
