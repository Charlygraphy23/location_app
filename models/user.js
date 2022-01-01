'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    password: { type: String },
    email: {
      type: String,
      default: '',
      index: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
