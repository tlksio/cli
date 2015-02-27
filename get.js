var options = { indexPath: 'data', logLevel: 'error', logSilent: false };
var si = require('search-index')(options);

var id = "1424999325603-4334659879095852.5-9321f82d745fcda1030bc9e464c578a0f65784a7";
si.get(id, function (err, doc) {
    console.log(doc);
});
