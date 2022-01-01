'use strict';
const { validationResult } = require('express-validator');

// models
const { User, Admin } = require('../models');

// imports
const { compareHashPassword } = require('../utils/app.utils');
const jwt = require('jsonwebtoken');
const { response } = require('../config/app.config');

// controllers
exports.signIn = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw {
        status: 422,
        message: 'Validation Error',
        errorArray: errors.array(),
      };
    }

    const { email, password } = req.body;

    // checking if user exist with provided mail
    const isUserFound = await User.findOne({ email }).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    if (!isUserFound) throw { status: 400, message: 'In-valid user!' };

    const passwordMatched = await compareHashPassword(
      password,
      isUserFound.password
    ).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    if (!passwordMatched) throw { status: 400, message: 'Un-authenticated' };

    const token = await jwt.sign(
      { userId: isUserFound._id },
      process.env.JWT_KEY
    );

    return response(res, 200, true, 'Login Successful', [], {
      _id: isUserFound._id,
      email: isUserFound.email,
      token,
    });
  } catch (err) {
    next(err);
    console.error(err);
  }
};

exports.checkRadius = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw {
        status: 422,
        message: 'Validation Error',
        errorArray: errors.array(),
      };
    }

    const { lat, lng } = req.body;

    const userWithInLocation = await Admin.findOne({
      location: { $geoWithin: { $centerSphere: [[lng, lat], 100 / 6378.1] } },
    }).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    if (!userWithInLocation) throw { status: 400, message: 'Not Found!' };

    return response(res, 200, true, 'Ok', []);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    let userData = await User.findById({ _id: req.user._id }).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    userData.password = undefined;

    return response(res, 200, true, 'Fetch successfully', [], userData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
