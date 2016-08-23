
var db = require('../db');

exports.savePost = function(hastag, id, post, success, failure){    

    command = 'INSERT INTO posts (hastag, post_id, post) ';
    command += 'VALUES (?, ?, ?);';
    params = [ hastag, id, post ];  
        
    db.client().execute(command, params, {prepare: true}, function (err, result){
        if(err){
           failure(err);        
        }else{
           success("savePost:" + hastag + "-" + id);
        }
    }); 
};

exports.saveLang = function(hastag, success, failure){    

    command = 'UPDATE langs ';
    command += 'SET lang_pt = lang_pt + 1 ';
    command += 'WHERE hastag = ?'; 
    params = [ hastag ];  

    db.client().execute(command, params, {prepare: true}, function (err, result){
        if(err){
           failure(err);        
        }else{
           success("saveLang:" + hastag);
        }
    }); 
};

exports.saveUser = function(user, success, failure){    

    command = 'INSERT INTO users (screen_name, followers_count, created_at, description, friends_count, location, name, profile_image_url) ';
    command += 'VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    params = [ user.screen_name, user.followers_count, user.created_at, user.description, user.friends_count, user.location, user.name, user.profile_image_url ] 
     
    db.client().execute(command, params, {prepare: true}, function (err, result){
        if(err){
           failure(err);        
        }else{
           success("saveUser:" + user.screen_name);
        }
    }); 
};

exports.saveCount = function(created_at, success, failure){   
    
    created_at = new Date(Date.parse(created_at));
     
    command = 'UPDATE count ';
    command += 'SET count = count + 1 ';
    command += 'WHERE year = ? and month = ? and day = ? and hour = ?;'; 

    params = [ created_at.getFullYear(), created_at.getMonth(), created_at.getDay(), created_at.getHours() ];
    
    db.client().execute(command, params, {prepare: true}, function (err, result){
        if(err){
           failure(err);        
        }else{
            success("saveCount:" + created_at);
        }
    }); 
};