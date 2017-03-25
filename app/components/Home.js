// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

class Home extends Component {
  
   componentWillMount() {
     this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15');
   }

   componentDidMount() {
     setInterval(() => {
       console.log('timer called')
       this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15');
     }, 10000)
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
              Current Show:
            </div>
        </div>
      </div>
    );
  }
}

export default Home
