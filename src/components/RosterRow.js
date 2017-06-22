import React, { Component } from 'react';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import { Field } from 'redux-form';
import cssModules from 'react-css-modules';
import MdCancel from 'react-icons/lib/md/cancel';
import MdDragHandle from 'react-icons/lib/md/drag-handle';
import RFSelect from './RFSelect.js';
import baseStyles from '../style/index.css';
import rosterStyles from '../style/roster.css';

const GENDER_OPTIONS = [
  { value: 'Boy', label: 'Boy' },
  { value: 'Girl', label: 'Girl' }
];

const POSITION_OPTIONS = [
  { value: 'P', label: 'P' },
  { value: 'C', label: 'C' },
  { value: '1B', label: '1B' },
  { value: '2B', label: '2B' },
  { value: 'SS', label: 'SS' },
  { value: '3B', label: '3B' },
  { value: 'LF', label: 'LF' },
  { value: 'LC', label: 'LC' },
  { value: 'RC', label: 'RC' },
  { value: 'RF', label: 'RF' }
];

const Types = {
  ROW: 'row'
};

const rowSource = {
  beginDrag: props => props
};

const rowTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveRow(draggedId, props.id);
    }
  },
  drop(props) {
    props.updateBattingOrder();
  }
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

const targetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
})

@cssModules(rosterStyles)
class InputField extends Component {
  render() {
    const { input, label, type, meta } = this.props;
    const { touched, error } = meta;

    return (
      <div>
        <input
          styleName={`${touched && error ?
            'form-field-error' :
            'form-field'}`
          }
          {...input}
          type={type}
          placeholder={label}
        />
      </div>
    );
  }
}

@DragSource(Types.ROW, rowSource, sourceCollect)
@DropTarget(Types.ROW, rowTarget, targetCollect)
@cssModules(rosterStyles)
export default class RosterRow extends Component {
  render() {
    const { connectDragSource, connectDragPreview, connectDropTarget, id, deleteRow } = this.props;
    const opacity = this.props.isDragging ? 0 : 1;

    return connectDragPreview(connectDropTarget(
      <tr>
        {connectDragSource(
          <td>
            <MdDragHandle
              size={16}
              style={{
                marginTop: '-2px',
                marginRight: '15px'
              }}
            />
            <Field name={`${id}.battingOrder`} component={
              props =>
                <span>
                  {props.input.value > 10 ? 'Sub' : props.input.value}
                </span>
              }
            />
          </td>
        )}

        <td>
          <Field
            name={`${id}.name`}
            type="text"
            component={InputField}
            label="Name"
          />
        </td>

        <td>
          <Field
            name={`${id}.email`}
            type="text"
            component={InputField}
            label="Email"
          />
        </td>

        <td>
          <Field
            name={`${id}.phone`}
            type="text"
            component={InputField}
            label="Phone"
          />
        </td>

        <td>
          <Field
            name={`${id}.gender`}
            options={GENDER_OPTIONS}
            component={RFSelect}
            placeholder="Gender"
          />
        </td>

        <td>
          <Field
            name={`${id}.position`}
            options={POSITION_OPTIONS}
            component={RFSelect}
            placeholder="Position"
          />
        </td>

        <td styleName="paid-field">
          <Field
            name={`${id}.paid`}
            type="checkbox"
            component={InputField}
            label="Paid"
          />
        </td>

        <td styleName="remove-player-button">
          <MdCancel
            title="Remove player"
            size={20}
            onClick={deleteRow}
          />
        </td>
      </tr>
    ));
  }
}
