var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');

// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


var extServerOptions = {
    host: 'localhost',
    port: '3000',
    path: '/api/version1',
    method: 'GET'
};

function get() {
    var version="";
    http.request(extServerOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
        version = JSON.parse(data);
        console.log(version.name);
        //return version; 
        });
    }).end();
   
};

//let temp = get();

//console.log(temp);

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});