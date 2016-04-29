import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import moment from 'moment';
import gamesStyles from '../style/games.css';

@cssModules(gamesStyles)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  getGameStyle() {
    const { date } = this.props.game;
    const today = moment().startOf('day');

    return date.startOf('day').diff(today) ? 'game' : 'game-today';
  }

  getAwayTeamStyle() {
    const { awayScore, homeScore } = this.props.game;
    return awayScore > homeScore ? 'schedule-away-win' : 'schedule-away';
  }

  getHomeTeamStyle() {
    const { awayScore, homeScore } = this.props.game;
    return homeScore > awayScore ? 'schedule-home-win' : 'schedule-home';
  }

  getGameStatusStyle() {
    const { awayScore, homeScore, date } = this.props.game;
    const today = moment().startOf('day');
    const fiveDaysAgo = today.subtract(5, 'days').startOf('day');
    const noResults = awayScore === undefined && homeScore === undefined;

    return noResults && date < fiveDaysAgo ? 'postponed' : null;
  }

  getTeamDugout() {
    return this.props.game.homeTeam === 'Mud Dohgs' ? 'Home' : 'Away';
  }

  render() {
    const { game } = this.props;

    const gameStyle = this.getGameStyle();
    const awayTeamStyle = this.getAwayTeamStyle();
    const homeTeamStyle = this.getHomeTeamStyle();

    const gameStatusStyle = this.getGameStatusStyle();
    const teamDugout = this.getTeamDugout();

    return (
      <li styleName={gameStyle}>
        <a target="_blank" href="http://www.impactgoldaustin.com/wp-content/uploads/2014/07/Kreig-Fields-Map.pdf">
          <div styleName={gameStatusStyle}>
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
                <span styleName='schedule-team-dugout'>{teamDugout}</span>
              </div>
            </span>
          </div>
        </a>
      </li>
    );
  }
}
