var winston = require('winston');
var dateFormat = require('dateformat');
var dirLog = './logs';
var fs = require('fs');

if (!fs.existsSync(dirLog)){
    fs.mkdir(dirLog, function(err) {
        if (err) throw err;        
    });    
}

// create the main logger
var logger = new(winston.Logger)({
    transports: [
        // setup console logging
        new(winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        // setup logging to file
        new(winston.transports.File)({
            level: 'debug',
            filename: dirLog + '/api_restful-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};