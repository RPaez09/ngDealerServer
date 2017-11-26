var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new  Schema({
    local : {
        firstName : {
            type: String,
            Required: 'Please supply a first name'
        },
        lastName : {
            type: String,
            Required: 'Please supply a last name'
        },
        email : {
            type : String,
            Required : 'Please supply a user email'
        },
        password : {
            type : String,
            Required: 'Please supply a user password'
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }
});

userSchema.methods.generateHash = function( password ) {
    return bcrypt.hashSync( password , bcrypt.genSaltSync(8) , null );
};

userSchema.methods.validPassword = function( password ){
    return bcrypt.compareSync( password , this.local.password );
};

module.exports = mongoose.model( 'User' , userSchema );