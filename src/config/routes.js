import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
import GameListPage from '../containers/GameListPage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <Route component={App}>
    <Route path="/" component={GameListPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
