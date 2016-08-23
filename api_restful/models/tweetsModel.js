//var moment = request('moment');
var db = require('../db');

exports.getUsers = function(success, failure) {

    command = 'SELECT screen_name, followers_count FROM USERS;';
    db.client().execute(command, { prepare: true }, function(err, result) {
        if (err) {
            failure(err);
        } else {
            success(formatResult(result.rows));
        }
    });
};

exports.getLangs = function(success, failure) {

    command = 'SELECT * FROM LANGS;';
    db.client().execute(command, { prepare: true }, function(err, result) {
        if (err) {
            failure(err);
        } else {
            success(result.rows);
        }
    });
};

exports.getCount = function(success, failure) {

    command = 'SELECT day, hour, count FROM COUNT;';
    db.client().execute(command, { prepare: true }, function(err, result) {
        if (err) {
            failure(err);
        } else {
            success(JSON.stringify(result.rows));
        }
    });
};

function formatResult(rows) {

    var result = [];
    if (rows.length > 0) {

        rows.sort(function(a, b) {
            return (a.followers_count < b.followers_count) ? 1 : ((b.followers_count < a.followers_count) ? -1 : 0);
        });
        
        result = rows.slice(0,5);
    }

    return result;

}