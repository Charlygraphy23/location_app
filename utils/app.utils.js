'use strict';
const bcrypt = require('bcrypt');

/**
 *
 * @param {String} password
 * @param {String} hashPassword
 * @returns {Promise}
 */
exports.compareHashPassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
