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

  render() {
    const { onSubmit } = this.props;

    return (
      <form styleName='form' onSubmit={(e) => {
        e.preventDefault();
        onSubmit(this.state.url, this.state.password);
      }}>
        <h2 styleName='h2'>Coach Brim</h2>
        <div>
          <label styleName='form-label' htmlFor='url'>Schedule URL</label>
          <input styleName='form-field' type='text' name='url' value={this.state.url} onChange={this.handleChange.bind(this)} />
        </div>

        <div>
          <label styleName='form-label' htmlFor='url'>Password</label>
          <input styleName='form-field' type='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        </div>

        <input styleName='button' type='submit' value='Update' />
      </form>
    );
  }
}
