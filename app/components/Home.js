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

  state = {
    timer: null
  }
  
   componentWillMount() {
     this.props.currentShowFetchData('http://95bfm.com/block_refresh/bfm_tweaks/current_show');
   };

   componentDidMount() {
     setInterval(() => {
       this.props.currentShowFetchData('http://95bfm.com/block_refresh/bfm_tweaks/current_show');
     }, 60000)
    };

    bFMPlay() {
      bFM = new Audio(bFMUrl);
      bFM.play();
      this.props.isPlaying(true);
      this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15')
      var timer = setInterval(() => {
            this.props.nowPlayingFetchData('http://95bfm.com/block_refresh/views/playlist-block_2/node/15')
      }, 10000)

      this.setState({timer});
    }

    bFMPause() {
        bFM.pause();
        this.props.isPlaying(false);
    }

    bFMStop() {
      bFM.pause();
      bFM.currentTime = 0.0;
      bFM = null;
      this.props.isPlaying(false);
      clearInterval(this.state.timer)
    }

  render() {
    const { streamPlaying, nowPlaying, currentShow } = this.props;
    return (
      <div>
        <div className={styles.container}>
          
          <a onClick={() => shell.openExternal('http://95bfm.com')}>
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
                { streamPlaying ?
                <div>
                    <p>{nowPlaying.song}</p>

                    { nowPlaying.spotifyData ?
                        <div>
                          <img className={styles.albumArt} src={nowPlaying.spotifyData.albumArt || nowPlaying.iTunesData.albumArt} alt=""/>
                          <a onClick={() => {
                            if(shell.openExternal(nowPlaying.spotifyData.appUri)){
                              shell.openExternal(nowPlaying.spotifyData.appUri)
                            } else {
                              shell.openExternal(nowPlaying.spotifyData.webUrl)
                            }
                            }}>
                              <br/>
                              <img className={styles.spotify} width="80" src="http://static.wixstatic.com/media/19262f_383ee592ecf24427829739b9e85ece42~mv2_d_4500_1680_s_2.png" alt=""/>
                          </a>
                          <a onClick={() => shell.openExternal(nowPlaying.iTunesData.webUrl)}>
                              <img className={styles.iTunes} width="80" src="http://rosesandcigarettes.com/wp-content/themes/roses-theme/library/images/itunes_logo.png" alt=""/>
                          </a>
                        </div>
                    : 
                    <img className={styles.altImage} src="https://www.xtrme.com/wp-content/uploads/2011/11/record.png" alt=""/> }
                </div>
                : null }
               
            </div>
        </div>
      </div>
    );
  }
}

export default Home
