import React, { Component } from 'react';

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

  render() {
    const { onSubmit } = this.props;

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(this.state.url);
      }}>
        <input type='text' name='url' value={this.state.url} onChange={this.handleChange.bind(this)} />
        <input type='submit' value='Update' />
      </form>
    );
  }
}
