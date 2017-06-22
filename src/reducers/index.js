import { createStore, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import games from './games';
import standings from './standings';
import roster from './roster';

const rootReducer = combineReducers({
  games,
  standings,
  roster,
  routing,
  form: formReducer
});

export default rootReducer;
