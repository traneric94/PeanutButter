/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
// var add = require('./routes/add');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);

// Example route
// app.get('/users', user.list);
//app.post('/add', add.addSong);

var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
    client.emit('messages', 'registered');
  });

  client.on('messages', function(data) {
    console.log('received', data);
    client.broadcast.emit('broad', data);
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
