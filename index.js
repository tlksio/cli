var libtlks = require('libtlks');
var config = require('./config.json');

// create / open the index
var options = {
    indexPath: 'data',
    logLevel: 'error',
    logSilent: false
}
var si = require('search-index')(options);

// get all talks from the database
libtlks.talk.all(config.dburl, function (err, talks) {
    if (err) {
        throw new Error(err);
    }
    talks.forEach(function (el) {
        // add a talk to the database
        si.add({ batchName: 'initial', filters: ['title', 'description', 'tags'] }, el, function (err) {
            if (err) {
                throw new Error(err);
            }
            console.log('Indexed: ' + el.slug);
        });
    });
});
