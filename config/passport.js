var config = require('../config/database');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy
var User = require('../api/models/userModel');

module.exports = function( passport ){
    var opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();  //old
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = config.secret;
    passport.use (
        new JwtStrategy ( opts , function( jwt_payload, done ) 
            {
                User.findOne( { id: jwt_payload.id } , function( err , user ) 
                {
                    if ( err ) { return done( err , false ); }
                    if ( user ) { done( null, user ); }
                    else { done( null, false ); }
                } );
            }
    ));
};