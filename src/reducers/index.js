import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import games from './games';
import standings from './standings';

const rootReducer = combineReducers({
  games,
  standings,
  routing
});

export default rootReducer;
