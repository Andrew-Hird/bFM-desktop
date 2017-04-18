var bandcamp = require('node-bandcamp');

console.log('searching')
bandcamp.trackSearch('HEAVY - Steak Night', 100)
.then(function(results){
    for (var i = 0; i < results.length; i++){
        if (results[i].title === 'Steak Night') {
            console.log(results[i])
        }
    }
})
.then(() => console.log('finished searching'))
.catch(function(err) {
    console.log(err)
})