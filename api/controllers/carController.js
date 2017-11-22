'use strict';

var mongoose = require('mongoose'),
  Car = mongoose.model('Cars');

exports.list_all_cars = function(req, res) {
  Car.find({}, function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};

exports.list_by_make = function(req, res) {
  Car.find( { make: req.params.carMake } , function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};

exports.create_a_car = function(req, res) {
  Car.create(req.body).then(function(car){
    res.send(car);
  });
};

exports.read_a_car = function(req, res) {

  if(mongoose.Types.ObjectId.isValid( req.params.id) ) { // Check if car exists

    Car.findById(req.params.id).then(function(car, err) {
      if(err){
        res.send("err" + err);
      }
      else if (car == null){
        res.status(404).send("Car not found");
      }
      else{
        res.send(car);
      }
    });
  }

  else {
    res.status(404).send("Car not found");
  }
};

exports.update_a_car = function(req, res) {

  if(mongoose.Types.ObjectId.isValid( req.params.id ) ) { // Check if car exists

    var query = {"_id" : req.params.id};
    var update = {"$set" : 
      {"make" : req.body.make,
      "make" : req.body.make,
      "model" : req.body.model,
      "year" : req.body.year,
      "price" : req.body.price,
      "mileage" : req.body.mileage,
      "color" : req.body.color,
      "trim" : req.body.trim,
      "description" : req.body.description,
      "hidden" : req.body.hidden } 
    };
    var options = { new : true };

    Car.findOneAndUpdate( query , update , options , function( err , car ) {
    
      if( err ){
        res.send( "error: " + err );
      }

      res.json(car);
    
    });
  }

  else {
    res.status(404).send("Car not found");
  }

};

exports.delete_a_car = function(req, res) {
  Car.findByIdAndRemove( { _id: req.params.id } ).then(function(car) {
    res.send(car);
  });
};

