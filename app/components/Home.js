// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

class Home extends Component {
  
   componentWillMount() {
     this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15');
     this.props.currentShowFetchData('http://95bfm.com/block_refresh/bfm_tweaks/current_show');
   }

   componentDidMount() {
     setInterval(() => {
       this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15');
     }, 10000)
     setInterval(() => {
       this.props.currentShowFetchData('http://95bfm.com/block_refresh/bfm_tweaks/current_show');
     }, 60000)
    };

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>bFM Player</h2>
          <audio controls src="http://streams.95bfm.com/stream128" />
          <br/>
            <div>
               Now Playing:{this.props.nowPlaying}
            </div>
            <div>
              Current Show:{this.props.currentShow}
            </div>
        </div>
      </div>
    );
  }
}

export default Home
