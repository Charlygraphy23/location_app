'use strict';

const { body } = require('express-validator');

exports.signInValidator = [
  body('email', 'Please provide email').notEmpty(),
  body('password', 'Please provide password').notEmpty(),

  body('email', 'Please provide a valid email').isEmail(),
];


exports.addDefaultCityValidator = [
  body('cityName', 'Please provide cityName').notEmpty(),
  body('lat', 'Please provide lat').notEmpty().isNumeric(),

  body('lng', 'Please provide a valid lng').notEmpty().isNumeric()
];
