'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var carSchema = new Schema({
  make: {
    type: String,
    Required: 'Please supply the make'
  },
  model: {
      type: String,
      Reqired: 'Please supply the model'
  },
  year: {
    type: Number,
    Requried: 'Please supply the model year'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cars', carSchema);