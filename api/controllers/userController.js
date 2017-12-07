'use strict';
var config = require('../../config/database');
var jwt = require('jsonwebtoken');
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

exports.sign_in = function( req , res ){ 
    User.findOne( { username : req.body.username } , function( err , user ) {
        if( err ) throw err;

        if( !user ) {
            res.status(401).send( { success: false, msg: 'Authentication failed. Invalid Username or Password.' } ); //Vague on purpose
        } else {
            // check if password matches
            user.comparePassword( req.body.password , function( err , isMatch ){
                if( isMatch && !err ){
                    // if user is found and password matches
                    var token = jwt.sign( user.toJSON() , config.secret ); // create token
                    // return the information including token as JSON
                    res.json( { success: true, token: 'JWT ' + token } );
                } else {
                    res.status(401).send( { success: false , msg: 'Authentication failed. Passwords do not match.' } );
                }
            } );
        }
    } );
 }