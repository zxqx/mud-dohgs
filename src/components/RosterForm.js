import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';
import cssModules from 'react-css-modules';
import MdPrint from 'react-icons/lib/md/print';
import validate from './RosterForm.validate.js';
import RosterTable from './RosterTable.js';
import baseStyles from '../style/index.css';
import rosterStyles from '../style/roster.css';

@connect((state, props) => ({
  initialValues: {
    players: props.roster
  }
}))
@reduxForm({ form: 'rosterForm', validate, enableReinitialize: true })
@cssModules({ ...baseStyles, ...rosterStyles })
export default class RosterForm extends Component {
  getButtonText() {
    if (this.props.submitting) {
      return 'Saving...';
    }
    else if (this.props.dirty) {
      return 'Save Roster';
    }
    else {
      return 'Saved';
    }
  }

  render() {
    const { handleSubmit, pristine, dirty, invalid, submitting, submitFailed } = this.props;

    return (
      <div styleName="roster-container">
        <div styleName="roster">
          <button
            styleName="button-print"
            onClick={window.print}
          >
            <MdPrint
              title="Print Lineup"
              size={22}
            />
          </button>

          <form onSubmit={handleSubmit}>
            <FieldArray name="players" component={RosterTable} />

            <div styleName="form-footer">
              <span styleName="form-message">
                {dirty && !submitting && !submitFailed ?
                  'You have unsaved changes.'
                : null}

                {submitFailed && invalid ?
                  'The price is wrong, bitch.'
                : null}
              </span>

              <button styleName={submitFailed && invalid ? 'button-failed': 'button'} disabled={pristine || submitting}>
                {this.getButtonText()}
              </button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}
