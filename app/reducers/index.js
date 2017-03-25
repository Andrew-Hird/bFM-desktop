// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import { nowPlaying, nowPlayingHasErrored, nowPlayingIsLoading } from './home';

const rootReducer = combineReducers({
  counter,
  nowPlaying,
  nowPlayingHasErrored,
  nowPlayingIsLoading,
  routing
});

export default rootReducer;
