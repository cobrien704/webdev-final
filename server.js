var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
require('./server/app.js')(app);

var port = process.env.PORT || 8080;

app.listen(port);