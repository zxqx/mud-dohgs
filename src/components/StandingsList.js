import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import standingsStyles from '../style/standings.css';

@cssModules(standingsStyles)
export default class StandingsList extends Component {
  static propTypes = {
    standings: PropTypes.array.isRequired
  };

  render() {
    const { standings } = this.props;

    return (
      <div styleName='standings'>
        <table styleName='standings-table'>
          <thead>
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th>W-L</th>
              <th>Diff</th>
            </tr>
          </thead>

          <tbody>
            {standings.map(standing =>
              <tr key={standing.team}>
                <td>{standing.place}</td>
                <td>{standing.team}</td>
                <td>{standing.wins}-{standing.losses}</td>
                <td>{standing.runDifferential}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
