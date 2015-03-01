#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

var talks = require('libtlks').talk;

if (argv.reindex) {
    talks.all(function(error, docs) {
        docs.forEach(function(el) {
            console.log(el);
        });
    });
}

// --version
if (argv.version) {
    var pkg = require('./package.json');
    console.log(pkg.version);
    process.exit();
}

console.log('usage: tlksio <options> <arguments>');
console.log('');
console.log('Options:');
console.log('   --reindex   Build the index.');
console.log('   --version   Show version number.');
console.log('   --help      Show this help message.');
