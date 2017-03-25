// @flow

export function nowPlayingHasErrored(state = false, action) {
    switch (action.type) {
        case 'NOW_PLAYING_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function nowPlayingIsLoading(state = false, action) {
    switch (action.type) {
        case 'NOW_PLAYING_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function nowPlaying(state = '', action) {
    switch (action.type) {
        case 'NOW_PLAYING_FETCH_DATA_SUCCESS':
            return action.nowPlaying;
        default:
            return state;
    }
}