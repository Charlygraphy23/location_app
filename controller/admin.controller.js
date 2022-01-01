'use strict';
const { validationResult } = require('express-validator');

// models
const { Admin } = require('../models');

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
    const isAdminFound = await Admin.findOne({ email }).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    if (!isAdminFound) throw { status: 400, message: 'In-valid user!' };

    const passwordMatched = await compareHashPassword(
      password,
      isAdminFound.password
    ).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    if (!passwordMatched) throw { status: 400, message: 'Un-authenticated' };

    const token = await jwt.sign(
      { adminId: isAdminFound._id },
      process.env.JWT_KEY
    );

    return response(res, 200, true, 'Login Successful', [], {
      _id: isAdminFound._id,
      email: isAdminFound.email,
      token,
    });
  } catch (err) {
    next(err);
    console.error(err);
  }
};

exports.addDefaultCity = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw {
        status: 422,
        message: 'Validation Error',
        errorArray: errors.array(),
      };
    }

    const { cityName, lat, lng } = req.body;
    const admin = req.admin;

    await Admin.findByIdAndUpdate(
      { _id: admin._id },
      { city: cityName, location: { type: 'Point', coordinates: [lng, lat] } }
    ).catch((err) => {
      throw { status: 500, message: err.message, error: err };
    });

    return response(res, 201, true, 'Updated successfully', []);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getMyProfile = async (req, res, next) => {
  try {
    let adminData = await Admin.findById({ _id: req.admin._id }).catch(
      (err) => {
        throw { status: 500, message: err.message, error: err };
      }
    );

    adminData.password = undefined;

    return response(res, 201, true, 'Fetch successfully', [], adminData);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
