'use strict';

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    city: { type: String, default: '' },
    //long - lat
    location: {
      type: { type: String, enum: ['Point', ''] },
      coordinates: { type: [Number] },
    },
    password: { type: String },
    email: {
      type: String,
      default: '',
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

adminSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('admins', adminSchema);
