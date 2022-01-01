'use strict';

const { body } = require('express-validator');

exports.signInValidator = [
  body('email', 'Please provide email').notEmpty(),
  body('password', 'Please provide password').notEmpty(),

  body('email', 'Please provide a valid email').isEmail(),
];

exports.checkCityValidator = [
  body('lat', 'Please provide lat').notEmpty(),
  body('lng', 'Please provide lng').notEmpty(),
  body('lng', 'lng will a number').isNumeric(),
  body('lat', 'lat will a number').isNumeric(),
];
