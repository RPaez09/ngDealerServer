var express = require('express'),

app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Car = require('./api/models/carModel'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ngDealer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/carRoutes');
routes(app);

app.listen(port);

console.log('nGDealer RESTful API server started on: ' + port);