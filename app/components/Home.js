// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { shell } from 'electron';
import { Button } from 'react-toolbox/lib/button';
import styles from './Home.css';

const bFMUrl = 'http://streams.95bfm.com/stream128';
let bFM = null;

const play = <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>;

const pause = <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/>
              </svg>;

const stop = <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 6h12v12H6z"/>
             </svg>;
        

class Home extends Component {
  
   componentWillMount() {
     this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15');
     this.props.currentShowFetchData('http://95bfm.com/block_refresh/bfm_tweaks/current_show');
   };

   componentDidMount() {
     setInterval(() => {
       this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15')
     }, 10000)
     setInterval(() => {
       this.props.currentShowFetchData('http://95bfm.com/block_refresh/bfm_tweaks/current_show');
     }, 60000)
    };

    bFMPlay() {
      bFM = new Audio(bFMUrl);
      // bFM.load();
      bFM.play();
      this.props.isPlaying(true);
    }

    // bFMPause() {
    //   bFM.pause();
    //   this.props.isPlaying(false);
    // }

    bFMStop() {
      bFM.pause()
      bFM.currentTime = 0.0;
      bFM = null
      this.props.isPlaying(false);
    }

  render() {
    const { streamPlaying, nowPlaying, currentShow, spotifyLink } = this.props;
    return (
      <div>
        <div className={styles.container}>
          
          <a onClick={() => shell.openExternal('http://95bfm.com')}>
            {/*<img src="./images/bfm.png" alt="95bFM" />*/}
            <img className={styles.logo} src="http://95bfm.com/sites/all/themes/bfm_ui/images/95bfm-logo.svg" alt="95bFM" />
          </a>
          

            <div>
               <p>{currentShow.show}</p>
                <a className={styles.controls}>
                  {
                    streamPlaying ?
                      <div>
                        {/*<div onClick={() => this.bFMPause()}>{pause}</div>*/}
                        <div onClick={() => this.bFMStop()}>{stop}</div>
                      </div>
                    :
                      <div onClick={() => this.bFMPlay()}>{play}</div>
                  }
                </a>
               <p>{nowPlaying.song}</p>

               { nowPlaying.spotifyData ?
                 <a onClick={() => {
                   if(shell.openExternal(nowPlaying.spotifyData.appUri)){
                    shell.openExternal(nowPlaying.spotifyData.appUri)
                   } else {
                    shell.openExternal(nowPlaying.spotifyData.webUrl)
                   }
                   }}>
                    <img className={styles.albumArt} src={nowPlaying.spotifyData.albumArt} alt=""/>
                    <br/>
                    <p>find on spotify</p>
                 </a>
               : 
               null }

            </div>
        </div>
      </div>
    );
  }
}

export default Home
