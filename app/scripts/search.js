const request = require('superagent');
const bandcamp = require('bandcamp-scraper');

export function SpotifySearch(dispatch, spotifyDispatch, nowPlaying) {
    if (nowPlaying.nowPlaying === "DJ's Choice") {
        return spotifyDispatch(dispatch, null);

    } else {
        const nowPlayingNoSpaces = nowPlaying.replace(/\s/g, '+');
        const song = nowPlaying.split(" - ").pop().trim();
        const url = `https://api.spotify.com/v1/search?q=${nowPlayingNoSpaces}&type=track`;

        return request
            .get(url)
            .then((response) => {
                if (!response) {
                    throw Error(`an error has occurred`);
                }
                const arr = response.body.tracks.items;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].name.toLowerCase() === song.toLowerCase()) {
                        var data = {
                            webUrl: arr[i].external_urls.spotify,
                            appUri: arr[i].uri,
                            albumArt: arr[i].album.images[1].url
                        }
                        return spotifyDispatch(dispatch, data);
                    } else {
                        return spotifyDispatch(dispatch, null);
                    }
                }
            })
            .catch((err) => {
                console.log('spotify error has occurred', err);
                return spotifyDispatch(dispatch, null);
            })
    }
}

export function iTunesSearch(dispatch, iTunesDispatch, nowPlaying) {
    if (nowPlaying.nowPlaying === "DJ's Choice") {
        return iTunesDispatch(dispatch, null);
    } else {
        const nowPlayingNoSpaces = nowPlaying.replace(/\s/g, '+');
        const song = nowPlaying.split(" - ").pop().trim();
        const url = `https://itunes.apple.com/search?term=${nowPlayingNoSpaces}&entity=musicTrack`;

        return request
            .get(url)
            .then((response) => {
                if (!response) {
                    throw Error(`an error has occurred`);
                }
                const arr = JSON.parse(response.text).results;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].trackName.toLowerCase() === song.toLowerCase()) {
                        var data = {
                            webUrl: arr[i].trackViewUrl,
                            albumArt: arr[i].artworkUrl100
                        }
                        return iTunesDispatch(dispatch, data);
                    } else {
                        return iTunesDispatch(dispatch, null);
                    }
                }
            })
            .catch((err) => {
                console.log('iTunes error has occurred', err);
                return iTunesDispatch(dispatch, null);
            })
    }
}

export function BandcampSearch(dispatch, bandcampDispatch, nowPlaying) {
    var params = {
        query: nowPlaying,
        // page: 1
    };

    bandcamp.search(params, function (error, searchResults) {
        if (error) {
            console.log(error);
            return bandcampDispatch(dispatch, searchResults)
        } else {
            console.log(searchResults);
            return bandcampDispatch(dispatch, searchResults)
        }
    });
}
