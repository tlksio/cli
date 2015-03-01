#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));

// --version
if (argv.version) {
    var pkg = require('./package.json');
    console.log(pkg.version);
    process.exit();
}

console.log('usage: tlksio <options> <arguments>');
console.log('');
console.log('Options:');
console.log('   --version   Show version number.');
console.log('   --help      Show this help message.');
