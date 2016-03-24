import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
import SchedulePage from '../containers/SchedulePage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <Route component={App}>
    <Route path='/' component={SchedulePage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
);
