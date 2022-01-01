'use strict';

const jwt = require('jsonwebtoken');
const { response } = require('../config/app.config');
const { Admin, User } = require('../models');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return response(res, 401, false, 'Unauthorized', []);

  const token = authorization.replace('Bearer ', '');

  try {
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err || !decoded) throw { status: 401, message: 'Unauthorized' };

      let adminId = decoded.adminId;
      let userId = decoded.userId;

      if (adminId) {
        const admin = await Admin.findById({ _id: adminId }).catch((err) => {
          throw { status: 500, message: err.message, error: err };
        });

        if (!admin) throw { status: 401, message: 'Unauthorized' };

        req.admin = admin;
      } else if (userId) {
        const user = await User.findById({ _id: userId }).catch((err) => {
          throw { status: 500, message: err.message, error: err };
        });

        if (!user) throw { status: 401, message: 'Unauthorized' };

        req.user = user;
      } else {
        throw { status: 401, message: 'Unauthorized' };
      }

      next();
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
