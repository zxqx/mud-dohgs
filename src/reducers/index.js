import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import games from './games';

const rootReducer = combineReducers({
  games,
  routing
});

export default rootReducer;
