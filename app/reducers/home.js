// @flow

// export type homeStateType = {
//   home: number
// };


export function streamPlaying(state = false, action) {
    switch (action.type) {

        case 'IS_PLAYING':
            return action.isPlaying

        default:
            return state;
    }
}

export function nowPlaying(state = {}, action) {
    switch (action.type) {

        case 'NOW_PLAYING_HAS_ERRORED':
            return {
                ...state,
                nowPlayingHasErrored: action.hasErrored
            }

        case 'NOW_PLAYING_IS_LOADING':
            return {
                ...state,
                nowPlayingIsLoading: action.isLoading
            }

        case 'NOW_PLAYING_FETCH_DATA_SUCCESS':
            return {
                ...state,
                song: action.nowPlaying
            }
        
        case 'NOW_PLAYING_SPOTIFY':
            return {
                ...state,
                spotifyData: action.spotifyData
            }
        
        case 'NOW_PLAYING_ITUNES':
            return {
                ...state,
                iTunesData: action.iTunesData
            }
        
        case 'NOW_PLAYING_BANDCAMP_LINK':
            return {
                ...state,
                bandcampLink: action.link
            }
        
        default:
            return state;

    }
}

export function currentShow(state = {}, action) {
    switch (action.type) {

        case 'CURRENT_SHOW_HAS_ERRORED':
            return {
                ...state,
                currentShowHasErrored: action.hasErrored
            }

        case 'CURRENT_SHOW_IS_LOADING':
            return {
                ...state,
                currentShowIsLoading: action.isLoading
            }

        case 'CURRENT_SHOW_FETCH_DATA_SUCCESS':
            return {
                ...state,
                show: action.currentShow
            }

        default:
            return state;
    }
}
