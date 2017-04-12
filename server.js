var express = require('express');
var bodyParser   = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
require('./server/app.js')(app);

var port = process.env.PORT || 8080;

app.listen(port);