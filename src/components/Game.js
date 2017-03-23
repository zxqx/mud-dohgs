import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import cssModules from 'react-css-modules';
import moment from 'moment';
import loadImages from 'load-images';
import gamesStyles from '../style/games.css';
import field1 from 'file!../static/krieg-field-01.png';
import field2 from 'file!../static/krieg-field-02.png';
import field3 from 'file!../static/krieg-field-03.png';
import field4 from 'file!../static/krieg-field-04.png';
import field5 from 'file!../static/krieg-field-05.png';
import field6 from 'file!../static/krieg-field-06.png';
import field7 from 'file!../static/krieg-field-07.png';
import field8 from 'file!../static/krieg-field-08.png';
import field9 from 'file!../static/krieg-field-09.png';
import field10 from 'file!../static/krieg-field-10.png';
import field11 from 'file!../static/krieg-field-11.png';

const fields = [field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11];

@cssModules(gamesStyles)
export default class Game extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    }
  }

  componentDidMount() {
    loadImages(fields);
  }

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

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getFieldMap() {
    let fieldNumber = parseInt(this.props.game.location.replace('Krieg ', ''));
    return fields[fieldNumber - 1];
  }

  render() {
    const { game } = this.props;

    const gameStyle = this.getGameStyle();
    const awayTeamStyle = this.getAwayTeamStyle();
    const homeTeamStyle = this.getHomeTeamStyle();

    const gameStatusStyle = this.getGameStatusStyle();
    const teamDugout = this.getTeamDugout();

    return (
      <li styleName={gameStyle} onClick={() => this.openModal()}>
        <div styleName={gameStatusStyle}>
          <span styleName='schedule-date'>
            <span styleName='schedule-month'>{game.date.format('MMM')}</span>
            <span styleName='schedule-day'>{game.date.format('D')}</span>
          </span>

          <span>
            <span styleName='schedule-time'>@ {game.time}</span>
            <span styleName={awayTeamStyle}>{game.awayTeam} {game.awayScore}</span>
            <span styleName='schedule-at-symbol'>@</span>
            <span styleName={homeTeamStyle}>{game.homeTeam} {game.homeScore}</span>
            <div>
              <span styleName='schedule-location'>{game.location} -&nbsp;</span>
              <span styleName='schedule-team-dugout'>{teamDugout}</span>
            </div>
          </span>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          styleName='modal'
          style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }}}>

          <button
            styleName='modal-close-btn'
            onClick={() => this.closeModal()}>
            Close Map
          </button>

          <img
            styleName='field-map'
            src={this.getFieldMap()}
            alt='Krieg Field map' />
        </Modal>
      </li>
    );
  }
}
