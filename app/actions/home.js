// @flow

import request from 'superagent';

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
                return response.text.replace(/(<([^>]+)>)/ig,"");
            })
            .then((nowPlaying) => dispatch(nowPlayingFetchDataSuccess(nowPlaying)))
            .catch(() => dispatch(nowPlayingHasErrored(true)));
    };    
}