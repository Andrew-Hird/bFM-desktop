// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { shell } from 'electron';
import { Button } from 'react-toolbox/lib/button';
import play from './images/play.svg'
import stop from './images/stop.svg';
import playing from './images/playing.svg';
import pause from './images/stop.svg';
import styles from './Home.css';

const bFMUrl = 'http://streams.95bfm.com/stream128';
let bFM = null;

class Home extends Component {

  state = {
    timer: null,
    hover: false
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
            if (bFM.ended || bFM.error) {
                this.bFMStop()
            }
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

    mouseOver() {
        this.setState({hover: true});
    }

    mouseOut() {
        this.setState({hover: false});
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

                <div className={styles.controls}>
                  {
                    streamPlaying ?
                      <div>
                        { 
                          this.state.hover ? 
                          <div onClick={() => this.bFMStop()}>
                              <a href="#"><img src={stop} alt="" onMouseOut={() => this.mouseOut()} /></a>
                          </div>
                          :
                          <div className={styles.playing}>
                              <img src={playing} alt="" onMouseOver={() => this.mouseOver()} />
                          </div>
                        }
                      </div>
                    :
                      <div className={styles.play} onClick={() => this.bFMPlay()}>
                          <a href="#"><img src={play} alt=""/></a>
                      </div>
                  }
                </div>

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
