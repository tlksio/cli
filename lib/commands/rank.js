var moment = require('moment');

var config = require('../../config.json');
var talks = require('libtlks').talk;
var rank = require('librank').rank;

function countHours(start, end) {
    var duration = moment.duration(end.diff(start));
    var hours = duration.asHours();
    return hours;
};

function calculateRank(talk) {
    var now = moment();
    var points = talk.voteCount;
    var hours = countHours(talk.created, now);
    var gravity = 1.8;
    var ranking = rank.rank(points, hours, gravity);
    return ranking;
};

function updateRank(talk) {
    var ranking = calculateRank(talk);
    talks.rank(config.dburl, {
        id: talk.id
    }, ranking, function(err) {
        if (err) {
            throw new Error(err);
        }
        console.log("Ranked talk " + talk.id + ": " + talk.ranking);
    });
}

exports.rank = function() {
    talks.all(config.dburl, function(err, docs) {
        if (err) {
            throw new Error(err);
        }
        docs.forEach(updateRank(talk));
    });
};
