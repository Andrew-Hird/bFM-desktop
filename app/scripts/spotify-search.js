const request = require('superagent');

export function SpotifySearch(nowPlaying) {
    if(nowPlaying.nowPlaying === "DJ's Choice") {
        return false;

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
                for (let i = 0; i < arr.length; i++ ) {
                    if(arr[i].name.toLowerCase() === song.toLowerCase()) {
                        return arr[i].external_urls.spotify;
                    }
                }
            })
            .catch(() => {
                console.log('error has occurred')
            })
    }
}