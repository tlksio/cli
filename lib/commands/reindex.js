var request = require('request');
var moment = require('moment');

var debug = require('debug')('cli:reindex');
var config = require('../../config.json');
var talks = require('libtlks').talk;
var rank = require('librank').rank;

/**
 * Resets full-text search index
 * @param callback  function    function to execute after finished
 */
function resetIndex(callback) {
    // Delete index
    request({
        url: config.elasticsearch + "/tlksio",
        method: 'DELETE'
    }, function(err, response, body) {
        if (err) {
            throw new Error(err);
        }
        debug('Index deleted');
        // Create index
        request({
            url: config.elasticsearch + "/tlksio",
            method: 'PUT',
        }, function(err, response, body) {
            if (err) {
                throw new Error(err);
            }
            debug('Index created');
            callback();
        });
    });
}

/**
 * Index talk to elasticsearch
 * @param talk  object  talk object
 */
function indexTalk(talk) {
    talk.tags = talk.tags || [];
    var obj = {
        id: talk.id,
        slug: talk.slug,
        title: talk.title,
        description: talk.description,
        tags: talk.tags.join()
    };
    var url = config.elasticsearch + "/tlksio/talks/" + talk.id;
    request({
        url: url,
        method: 'PUT',
        json: obj
    }, function(err, response, body) {
        if (err) {
            throw new Error(err);
        }
        debug("Indexed:" + talk.title);
    });
}

exports.reindex = function() {
    // Reset index
    resetIndex(function(err) {
        if (err) {
            throw new Error(err);
        }
        // Get all talks
        talks.all(config.mongodb, function(err, docs) {
            if (err) {
                throw new Error(err);
            }
            // Index each talk
            docs.forEach(indexTalk);
        });
    });
};
