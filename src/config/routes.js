import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
import SchedulePage from '../containers/SchedulePage';
import CoachPage from '../containers/CoachPage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <Route component={App}>
    <Route path='/' component={SchedulePage} />
    <Route path='coach' component={CoachPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
);
