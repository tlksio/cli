var moment = require('moment');

var debug = require('debug')('cli:rank');
var config = require('./config.json');
var talks = require('libtlks').talk;
var rank = require('librank').rank;

/**
 * Count the number of hours between two timestamps
 * @param start int     start timestamp
 * @param end   int     end timestamp
 */
function countHours(start, end) {
    var duration = moment.duration(end.diff(start));
    var hours = duration.asHours();
    return hours;
}

/**
 * Calculates score of a talk
 * @param talk  object  talk object
 */
function calculateRank(talk) {
    var now = moment();
    var points = talk.voteCount;
    var hours = countHours(talk.created, now);
    var gravity = 1.8;
    var ranking = rank.rank(points, hours, gravity);
    return ranking;
}

/**
 * Updates talk new score to the database
 * @param talk  object  talk object
 */
function updateRank(talk) {
    var score = calculateRank(talk);
    talks.rank(config.dburl, talk.id, score, function(err) {
        if (err) {
            throw new Error(err);
        }
        debug('Ranked talk %s with score: %s', talk.title, score);
    });
}

exports.rank = function() {
    talks.all(config.dburl, function(err, docs) {
        if (err) {
            throw new Error(err);
        }
        docs.forEach(updateRank);
    });
};
