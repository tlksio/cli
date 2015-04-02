var request = require('request');
var moment = require('moment');

var config = require('../../config.json');
var talks = require('libtlks').talk;
var rank = require('librank').rank;

function resetIndex(callback) {
    // Delete index
    request({
        url: config.elasticsearch + "/tlksio",
        method: 'DELETE'
    }, function(err, response, body) {
        if (err) {
            throw new Error(err);
        }
        // Create index
        request({
            url: config.elasticsearch + "/tlksio",
            method: 'PUT',
        }, function(err, response, body) {
            if (err) {
                throw new Error(err);
            }
            talks.all(config.dburl, function(err, docs) {
                if (err) {
                    throw new Error(err);
                }
                docs.forEach(indexTalk(el));
            });
        });
    });
}

function indexTalk(el) {
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
    }, function(err, response, body) {
        if (err) {
            throw new Error(err);
        }
        console.log("Indexed:" + el.title);
    });
}

exports.reindex = function() {
    resetIndex(function(err) {
        if (err) {
            throw new Error(err);
        }
        // Get all talks
        talks.all(config.dburl, function(err, docs) {
            if (err) {
                throw new Error(err);
            }
            // Index each talk
            docs.forEach(indexTalk(el, function(err) {
                if (err) {
                    throw new Error(err);
                }
            }));
        });
    });
};
