import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import baseStyles from '../style/index.css';

@cssModules(baseStyles)
export default class ScheduleUrlForm extends Component {
  constructor() {
    super();

    this.state = {
      url: null
    }
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  getButtonStyle() {
    const { loading, failed } = this.props.scheduleUrl;

    if (loading) {
      return 'button-loading';
    }

    if (failed) {
      return 'button-failed';
    }

    return 'button';
  }

  validateForm() {
    const { url } = this.state;

    return url && url.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
  }

  render() {
    const { scheduleUrl, onSubmit, onFailure } = this.props;
    const { loading, failed, saved } = scheduleUrl;
    const { url } = this.state;

    return (
      <form styleName='form' onSubmit={(e) => {
        e.preventDefault();

        if (!this.validateForm()) {
          return onFailure();
        }

        onSubmit(url);
      }}>
        <div>
          <label styleName='form-label' htmlFor='url'>Schedule URL</label>
          <input styleName='form-field' type='text' id='url' name='url' value={this.state.url} onChange={this.handleChange.bind(this)} />
        </div>

        <button styleName={this.getButtonStyle()}>
          Update
        </button>

        {failed ? <div>The price is wrong, bitch.</div> : null}
        {saved ? <div>Saved.</div> : null}
      </form>
    );
  }
}
