var express = require('express');
var app = express();

var expressWs = require('express-ws')(app);
var port = 3000;


app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route', req.testing);
    res.end();
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log("on message");
        console.log(msg);
    });
    console.log('socket', req.testing);

    ws.send('Hi there, I am a WebSocket server');
});

app.listen(port, function () {
    console.log("App listening at ws://localhost:%s", port);
});
