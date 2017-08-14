'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var carSchema = new Schema({
  make: {
    type: String,
    Required: 'Please supply make'
  },
  model: {
      type: String,
      Reqired: 'Please supply model'
  },
  year: {
    type: Number,
    Requried: 'Please supply model year'
  },
  price: {
    type: Number,
    Required: 'Please supply the vehicle price'
  },
  mileage: {
    type: Number,
    Required: 'Please supply vehicle mileage'
  },
  color: {
    type: Number,
    Required: 'Please supply the vehicle color'
  },
  trim: {
    type: String
  },
  hidden: {
    type: Boolean,
    default: false
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cars', carSchema);