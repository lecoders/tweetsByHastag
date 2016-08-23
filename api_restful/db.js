var cassandra = require('cassandra-driver');

var state = {
  db: null ,
  cassandra: cassandra
};

exports.connect = function(options, done){
    if (state.db){
      return done();  
    } 
    
    state.db = new cassandra.Client(options);
    
    if (state.db){
      return done();  
    } 
    
}

exports.disconnect = function(done){
    if (state.db){
        state.db.shutdown();
    }    
}

exports.client = function (){ return state.db;}

exports.cassandra = function(){ return state.cassandra;}