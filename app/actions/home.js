// @flow

import { SpotifySearch } from '../scripts/spotify-search';

import request from 'superagent';

export function isPlaying(bool) {
    return {
        type: 'IS_PLAYING',
        isPlaying: bool
    };
}


export function nowPlayingHasErrored(bool) {
    return {
        type: 'NOW_PLAYING_HAS_ERRORED',
        hasErrored: bool
    };
}
export function nowPlayingIsLoading(bool) {
    return {
        type: 'NOW_PLAYING_IS_LOADING',
        isLoading: bool
    };
}
export function nowPlayingFetchDataSuccess(nowPlaying) {
    return {
        type: 'NOW_PLAYING_FETCH_DATA_SUCCESS',
        nowPlaying
    };
}

export function nowPlayingFetchData(url) {
    return (dispatch) => {
        dispatch(nowPlayingIsLoading(true));
        request
            .get(url)
            .then((response) => {
                if (!response) {
                    throw Error(`an error has occurred`);
                }
                dispatch(nowPlayingIsLoading(false));
                return response.text
                    .replace(/(<([^>]+)>)/ig,"")
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt/g, ">")
                    .replace(/&quot;/g, "\"")
                    .replace(/&#039;/g, "'")
                    .trim();
            })
            .then((nowPlaying) => dispatch(nowPlayingFetchDataSuccess(nowPlaying)))
            .then((nowPlaying) => SpotifySearch(nowPlaying.nowPlaying))
            .then((spotifyLink) => dispatch(nowPlayingSpotify(spotifyLink)))
            .catch(() => dispatch(nowPlayingHasErrored(true)));
    };    
}

export function nowPlayingSpotify(spotifyLink) {
    return {
        type: 'NOW_PLAYING_SPOTIFY_LINK',
        link: spotifyLink
    };
}

export function currentShowHasErrored(bool) {
    return {
        type: 'CURRENT_SHOW_HAS_ERRORED',
        hasErrored: bool
    };
}
export function currentShowIsLoading(bool) {
    return {
        type: 'CURRENT_SHOW_IS_LOADING',
        isLoading: bool
    };
}
export function currentShowFetchDataSuccess(currentShow) {
    return {
        type: 'CURRENT_SHOW_FETCH_DATA_SUCCESS',
        currentShow
    };
}

export function currentShowFetchData(url) {
    return (dispatch) => {
        dispatch(currentShowIsLoading(true));
        request
            .get(url)
            .then((response) => {
                if (!response) {
                    throw Error(`an error has occurred`);
                }
                dispatch(currentShowIsLoading(false));
                
                return response.text
                    .replace(/(<([^>]+)>)/ig,"")
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt/g, ">")
                    .replace(/&quot;/g, "\"")
                    .replace(/&#039;/g, "'")
                    .trim();
            })
            .then((currentShow) => dispatch(currentShowFetchDataSuccess(currentShow)))
            .catch(() => dispatch(currentShowHasErrored(true)));
    };    
}