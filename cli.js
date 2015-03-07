#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var request = require('request');

var config = require('./config.json');
var talks = require('libtlks').talk;

// --reindex
if (argv.reindex) {
    // Delete index
    request({
        url: config.elasticsearch + "/tlksio",
        method: 'DELETE'
    }, function(error, response, body) {
        // Create index
        request({
            url: config.elasticsearch + "/tlksio",
            method: 'PUT',
        }, function(error, response, body) {
            talks.all(config.dburl, function(error, docs) {
                docs.forEach(function(el) {
                    var obj = {
                        id: el.id,
                        slug: el.slug,
                        title: el.title,
                        description: el.description,
                        tags: el.tags.join()
                    };
                    var url = config.elasticsearch + "/tlksio/talk/" + el.id;
                    request({
                        url: url,
                        method: 'PUT',
                        json: obj
                    }, function(error, response, body) {
                        if (error) {
                            throw new Error(error);
                        }
                        console.log("Indexed:" + el.title);
                    });
                });
            });
        });
    });
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
    console.log('   --reindex   Build the index.');
    console.log('   --version   Show version number.');
    console.log('   --help      Show this help message.');
};
