import { createStore, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import games from './games';
import standings from './standings';
import roster from './roster';
import user from './user';

const rootReducer = combineReducers({
  games,
  standings,
  roster,
  user,
  routing,
  form: formReducer
});

export default rootReducer;
