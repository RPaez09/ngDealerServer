'use strict';
var User = require('../models/userModel');

function getToken( headers ){
  if( headers && headers.authorization ){
      var parted = headers.authorization.split(' ');
      if( parted.length === 2 ) {
          return parted[1];
      }
      else {
          return null;
      }
  } else {
      return null;
  }
}

var mongoose = require('mongoose');
var Car = mongoose.model('Cars');

exports.create_a_user = function( req , res ){
    if( !req.body.username || !req.body.password ){
        res.json( { succcess: false , msg: 'Please supply a username and password' } );
    } else {
        var newUser = new User( { username: req.body.username , password : req.body.password } );
        // now on to save that new user
        newUser.save( function(err){
            if( err ) {
                return res.json( { success: false, msg: 'Username already taken' } );
            }
            res.json( { success: true, msg: 'New user created successfully' } );
        } );
    }
}