var http = require('http');
var apiusers = 'http://localhost:3000/tweets/users';
var apilangs = 'http://localhost:3000/tweets/langs';
var apicount = 'http://localhost:3000/tweets/count';
var result = '<h2>Welcome Tweets</h2><br>';


http.createServer(function(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    require('http').get(apiusers, function(response) {
        var buffer = "", data, route;
        response.on('data', function(chunk) {
            buffer += chunk;
        });
        response.on('end', function(err) {
            result += '<b>Top 5 usuário com mais seguidores:</b><br>';
            buffer = JSON.parse(buffer);
            buffer.forEach(function(element) {
                result += element.screen_name + ' = ' + element.followers_count + ' Seguidores<br>';
            });

            require('http').get(apilangs, function(response) {
                var buffer = "", data, route;
                response.on('data', function(chunk) {
                    buffer += chunk;

                });
                response.on('end', function(err) {
                    result += '<br><b>Total de posts em portugues por Hastag:</b><br>';
                    buffer = JSON.parse(buffer);
                    buffer.forEach(function(element) {
                        result += element.hastag + ' = ' + element.lang_pt + ' posts em Português<br>';
                    });

                    require('http').get(apicount, function(response) {
                        var buffer = "", data, route;
                        response.on('data', function(chunk) {
                            buffer += chunk;
                        });
                        response.on('end', function(err) {
                            result += '<br><b>Total de posts por hora do dia:</b><br>';
                            buffer = JSON.parse(buffer);
                            buffer.forEach(function(element) {
                                result += 'No dia ' + element.day + ' às ' + element.hour + ' horas, ocorreram ' + element.count + ' postagens<br>';
                            });
                            res.status = 200;
                            res.end(result);
                        });
                    }).on('error', function() {
                        res.status = 404;
                        res.send(url);
                    });

                });
            }).on('error', function() {
                res.status = 404;
                res.send(url);
            });           
        });
    }).on('error', function() {
        res.status = 404;
        res.send(url);
    });


    require('http').get(apicount, function(response) {
        var buffer = "", data, route;
        response.on('data', function(chunk) {
            buffer += chunk;

        });
        response.on('end', function(err) {
            res.status = 200;

        });
    }).on('error', function() {
        res.status = 404;
        res.send(url);
    });




}).listen(2000);


