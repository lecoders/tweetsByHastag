var tweetsModel = require('../models/tweetsModel');

exports.getUsers = function(request, response){
    
    var success = function(result){
        response.stateCode = 200;
        response.send(result);        
    };
    
    var failure = function (err) {
        response.stateCode = 503;
        response.send(err);
    };
    
    tweetsModel.getUsers(success, failure)
};

exports.getLangs = function(request, response){
    
    var success = function(result){
        response.stateCode = 200;
        response.send(result);        
    };
    
    var failure = function (err) {
        response.stateCode = 503;
        response.send(err);
    };

    tweetsModel.getLangs(success, failure);

};

exports.getCount = function(request, response){

    var success = function(result){
        response.stateCode = 200;
        response.send(result);        
    };
    
    var failure = function (err) {
        response.stateCode = 503;
        response.send(err);
    };
    
    tweetsModel.getCount(success, failure);

};