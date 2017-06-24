import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import { change } from 'redux-form';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import cssModules from 'react-css-modules';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';
import RosterRow from './RosterRow.js';
import rosterStyles from '../style/roster.css';

@connect()
@DragDropContext(HTML5Backend)
@cssModules(rosterStyles)
export default class RosterTable extends Component {
  state = {
    isEditing: false
  }

  componentWillMount() {
    this.setState({
      rows: this.props.fields.map((player, index) => ({ id: player }))
    });
  }

  moveRow(id, afterId) {
    const rows = _.clone(this.state.rows);
    const currentRow = _.filter(rows, r => r.id === id)[0];
    const afterRow = _.filter(rows, r => r.id === afterId)[0];

    const currentRowIndex = rows.indexOf(currentRow);
    const afterRowIndex = rows.indexOf(afterRow);

    rows.splice(currentRowIndex, 1);
    rows.splice(afterRowIndex, 0, currentRow);

    this.setState({ rows });

    this.props.fields.move(id, afterId);
  }

  addRow() {
    const rows = _.clone(this.state.rows);
    rows.push({ id: `players[${rows.length}]` });

    this.setState({ rows });
  }

  deleteRow(index) {
    const { fields } = this.props;

    const rows = _.clone(this.state.rows);
    const i = parseInt(rows[index].id.match(/\d+/)[0]);
    fields.remove(i);

    const newRows = rows
      .filter((row, i) => index !== i)
      .map(row => {
        const id = parseInt(row.id.match(/\d+/)[0]);

        return {
          id: i <= id ? `players[${id - 1}]` : row.id
        }
      });

    this.setState({ rows: newRows });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.rows.length !== this.state.rows.length) {
      nextState.rows.forEach((row, index) => {
        this.props.dispatch(
          change('rosterForm', `${row.id}.battingOrder`, index + 1)
        );
      });
    }
  }

  updateBattingOrder() {
    this.state.rows.forEach((row, index) => {
      this.props.dispatch(
        change('rosterForm', `${row.id}.battingOrder`, index + 1)
      );
    });
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const { rows, isEditing } = this.state;
    const { fields, meta } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Position</th>
              <th>Paid</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) =>
              <RosterRow
                key={row.id}
                id={row.id}
                moveRow={this.moveRow.bind(this)}
                deleteRow={() => this.deleteRow(index)}
                updateBattingOrder={this.updateBattingOrder.bind(this)}
              />
            )}

            <tr>
              <td
                styleName="add-player-button"
                colSpan="8"
                onClick={() => {
                  const battingOrder = fields.length + 1 > 5 ? 'Sub' : fields.length + 1;
                  fields.push({ battingOrder });
                  this.addRow();
                }}
              >
                <MdAddCircleOutline
                  size={16}
                  style={{ marginTop: '-4px' }}
                />
                <span>Add Player</span>
              </td>
            </tr>
          </tbody>
        </table>

        {(meta.touched || meta.submitFailed) && meta.error && <span>{meta.error}</span>}
      </div>
    );
  }
}
