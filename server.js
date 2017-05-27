var express = require('express');
var mongoose = require('mongoose');
var Car = require('./api/models/carModel');
var routes = require('./api/routes/carRoutes');
var connectionString = 'mongodb://localhost/ngDealer';

var app = express();
var port = process.env.PORT || 3000;
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);

app.listen(port);

console.log('nGDealer RESTful API server started on: ' + port);