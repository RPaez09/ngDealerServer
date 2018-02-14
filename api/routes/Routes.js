var passport = require('passport');
var passportConfig = require('../../config/passport')( passport );

'use strict';
module.exports = function(app) {
  
  var cars = require('../controllers/carController');
  var users = require('../controllers/userController');
  
  app.route('/cars')
  .get( cars.list_all_cars )
  .post( passport.authenticate( 'jwt' , { session: false}) , cars.create_a_car );

  app.route('/cars/:id')
  .get( cars.read_a_car )
  .put( passport.authenticate( 'jwt' , { session: false}) , cars.update_a_car )
  .delete( passport.authenticate( 'jwt' , { session: false}) , cars.delete_a_car );

  app.route('/cars/make/:carMake')
    .get( cars.list_by_make );

  app.route('/signup')
    .post( users.create_a_user );

  app.route('/signin')
    .post( users.sign_in );
};