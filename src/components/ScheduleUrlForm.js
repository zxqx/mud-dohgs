import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import baseStyles from '../style/index.css';

@cssModules(baseStyles)
export default class ScheduleUrlForm extends Component {
  constructor() {
    super();

    this.state = {
      url: null,
      password: null
    }
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  getButtonStyle() {
    const { loading, failed } = this.props;

    if (loading) {
      return 'button-loading';
    }

    if (failed) {
      return 'button-failed';
    }

    return 'button';
  }

  render() {
    const { onSubmit, loading, failed, saved } = this.props;

    return (
      <form styleName='form' onSubmit={(e) => {
        e.preventDefault();
        onSubmit(this.state.url, this.state.password);
      }}>
        <h2 styleName='h2'>Coach Brim</h2>
        <div>
          <label styleName='form-label' htmlFor='url'>Schedule URL</label>
          <input styleName='form-field' type='text' id='url' name='url' value={this.state.url} onChange={this.handleChange.bind(this)} />
        </div>

        <div>
          <label styleName='form-label' htmlFor='password'>Password</label>
          <input styleName='form-field' type='password' id='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        </div>

        <input styleName={this.getButtonStyle()} type='submit' value='Update' />
        {failed ? <div>The price is wrong, bitch.</div> : null}
        {saved ? <div>Saved.</div> : null}
      </form>
    );
  }
}
