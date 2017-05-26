//var app = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ngDealer');

carModel = { make: String, model: String }

var Car = mongoose.model('Car' , carModel);

var myCar = new Car( { make: "Mazda", model: "Miata" } );

myCar.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});