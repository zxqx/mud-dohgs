import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import standingsStyles from '../style/standings.css';
import tableStyles from '../style/table.css';

@cssModules(standingsStyles)
export default class StandingsTable extends Component {
  static propTypes = {
    standings: PropTypes.array.isRequired
  };

  render() {
    const { standings } = this.props;

    return (
      <div styleName='standings'>
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th styleName='align-right'>W-L</th>
              <th styleName='align-right'>RD</th>
            </tr>
          </thead>

          <tbody>
            {standings.map(standing =>
              <tr
                key={standing.team}
                styleName={standing.team === 'Mud Dohgs' ? 'own-team' : ''}
              >
                <td>{standing.place || '--'}</td>
                <td>{standing.team}</td>
                <td styleName='align-right'>{standing.wins}-{standing.losses}</td>
                <td styleName='align-right'>{standing.runDifferential}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
