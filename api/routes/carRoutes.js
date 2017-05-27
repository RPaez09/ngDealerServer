'use strict';
module.exports = function(app) {
  var cars = require('../controllers/carController');
  
  // todoList Routes
  app.route('/cars')
    .get(cars.list_all_Cars)
    /*.post(cars.create_a_car)*/;

  app.route('/cars/make/:carMake')
    .get(cars.list_by_Make);
  /*app.route('/cars/:carId')
    .get(cars.read_a_car)
    .put(cars.update_a_car)
    .delete(cars.delete_a_car); */
};