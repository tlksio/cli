var libtlks = require('libtlks');
var config = require('./config.json');

var options = {
    indexPath: 'data',
    logLevel: 'error',
    logSilent: false
}
var si = require('search-index')(options);

libtlks.talk.all(config.dburl, function (err, talks) {
    if (err) {
        throw new Error(err);
    }
    console.log(talks);
});
