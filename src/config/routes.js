import React from 'react';
import { Route, Redirect } from 'react-router';
import App from '../containers/App';
import SchedulePage from '../containers/SchedulePage';
import StandingsPage from '../containers/StandingsPage';
import LoginPage from '../containers/LoginPage';
import LogoutPage from '../containers/LogoutPage';
import AdminPage from '../containers/AdminPage';
import RosterPage from '../containers/RosterPage';
import ScheduleUrlPage from '../containers/ScheduleUrlPage';

export default (
  <Route component={App}>
    <Route path='/' component={SchedulePage} />
    <Route path='standings' component={StandingsPage} />
    <Route path='login' component={LoginPage} />
    <Route path='logout' component={LogoutPage} />

    <Redirect from='admin' to='admin/roster' />
    <Route path='admin' component={AdminPage}>
      <Route path='roster' component={RosterPage} />
      <Route path='schedule-url' component={ScheduleUrlPage} />
    </Route>

    <Redirect from='*' to='/' />
  </Route>
);
