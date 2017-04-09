// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import * as home from './home'

const rootReducer = combineReducers({
  counter,
  ...home,
  routing
});

export default rootReducer;
