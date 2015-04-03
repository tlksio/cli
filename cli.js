#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

// --reindex
if (argv.reindex) {
    require('./lib/commands/reindex').reindex();
}

// --rank
else if (argv.rank) {
    require('./lib/commands/rank').rank();
}

// --version
else if (argv.version) {
    var pkg = require('./package.json');
    console.log(pkg.version);

// --help
} else {
    console.log('usage: tlksio <options> <arguments>');
    console.log('');
    console.log('Options:');
    console.log('   --reindex   Rebuild the search index');
    console.log('   --rank      Recalculate the rakning of all talks');
    console.log('   --version   Show version number.');
    console.log('   --help      Show this help message.');
}
