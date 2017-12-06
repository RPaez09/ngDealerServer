var bodyParser  = require('body-parser');
var cookieParser= require('cookie-parser');
var DBconfig    = require('./config/database.js');
var express     = require('express');
var mongoose    = require('mongoose');
var morgan      = require('morgan');
var passport    = require('passport');
var routes      = require('./api/routes/Routes');

var app = express();

var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(DBconfig.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

routes(app);

app.listen(port);

console.log('nGDealer RESTful API server started on: ' + port);