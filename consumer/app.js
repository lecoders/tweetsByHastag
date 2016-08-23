var db = require('./db');
var app = require('express')();
var logger = require('./logger');
var twitter = require('twitter');
var http = require('http').Server(app);
var model = require('./models/tweetsModel.js');
var hastags = ["#brasil","#brazil","#brazil2016","#jogosolimpicos","#olimpiadas",
               "#olimpiadas2016","#olympics","#rio2016","#riodejaneiro"];
var port = 4000;

app.set('port', port);

//Connection Cassandra
var options = {
    contactPoints: ["localhost"], 
    keyspace: 'tweets'
};

db.connect(options, function(err) {
    if (err) {
        logger.error('Unable to connect to Cassandra:' + err);
        process.exit(1);
    }
});

http.listen(port, function() {
    logger.info('Chat server is running and listening to port %d...', port);
});


var failure = function(err) {
    logger.error(err);
};
var success = function(res) {
    logger.info(res);
};


var client = new twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
});

hastags.forEach(function(element) {
    client.get('search/tweets', { q: element, count: 100 }, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } else if (tweets && tweets.statuses.length > 0) {
            logger.info(element + ' - Total:' + tweets.statuses.length);
            tweets.statuses.forEach(function(tweet) {
                model.savePost(element, tweet.id, JSON.stringify(tweet), success, failure);
                model.saveUser(tweet.user, success, failure);
                model.saveCount(tweet.created_at, success, failure);
                if (tweet.lang == 'pt') {
                    model.saveLang(element, success, failure);
                }
            }, this);
        } else {
            logger.error("Falha na recuperação dos tweets");
        }
    });
}, this);


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}