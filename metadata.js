var options = { indexPath: 'data', logLevel: 'error', logSilent: false };
var si = require('search-index')(options);

si.tellMeAboutMySearchIndex(function(msg) {
    console.log(msg);
});
