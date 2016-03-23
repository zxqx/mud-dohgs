import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGameList } from '../actions/games';
import LoadingIndicator from '../components/LoadingIndicator';
import GameList from '../components/GameList';

@connect(state => ({
  games: state.games
}))
export default class GameListPage extends Component {
  componentWillMount() {
    this.props.dispatch(getGameList());
  }

  render() {
    const { games } = this.props;

    if (!games.data.length) {
      return <LoadingIndicator />;
    }

    return (
      <GameList games={games.data} raw={games.raw} />
    )
  }
}
