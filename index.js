var elasticsearch = require('elasticsearch');

var talks = require('libtlks').talk;
var config = require('./config.json');

var client = new elasticsearch.Client({
    host: 'https://xuxikj44y5:jb06gkb4zo@tlksio-7785082337.eu-west-1.bonsai.io'
});

// curl -X POST https://xuxikj44y5:jb06gkb4zo@tlksio-7785082337.eu-west-1.bonsai.io/tlksio
// get all talks from the database
talks.all(config.dburl, function(err, docs) {
    if (err) {
        throw new Error(err);
    }
    docs.forEach(function(el) {
        var doc = {
            title: el.title
        };
        console.log(doc);
        client.index({
                index: 'tlksio',
                type: 'talk',
                id: doc.id,
                body: {
                    title: doc.title,
                    description: doc.description,
                    tags: doc.tags
                }
            },
            function(error, response) {
                if (error) {
                    throw new Error(error);
                }
                console.log('Indexed: ' + doc.title);
            });
    });
});
