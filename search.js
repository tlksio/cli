var options = { indexPath: 'data', logLevel: 'error', logSilent: false };
var si = require('search-index')(options);

var query = { "query": {"*":["linux"]} };

si.search(query, function (err, results) {
    if (err) {
        throw new Error(err);
    }
    console.log(results);
});

