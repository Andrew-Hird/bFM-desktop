// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as HomeActions from '../actions/home'

function mapStateToProps(state) {
  return {
    home: state.home,
    nowPlaying: state.nowPlaying,
    nowPlayingHasErrored: state.nowPlayingHasErrored,
    nowPlayingIsLoading: state.nowPlayingIsLoading,
    currentShow: state.currentShow,
    currentShowHasErrored: state.currentShowHasErrored,
    currentShowIsLoading: state.currentShowIsLoadings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
