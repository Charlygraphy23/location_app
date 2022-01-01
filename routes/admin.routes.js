'use strict';

const router = require('express').Router();

// middleware
const authMiddleware = require('../middleware/index.middleware');

// validator
const { signInValidator, addDefaultCityValidator } =
  require('../validators/index.validator').AdminValidator;

// controller
const { signIn, addDefaultCity, getMyProfile } =
  require('../controller/index.controller').AdminController;

router.post('/sign-in', signInValidator, signIn);
router.get('/profile', authMiddleware, getMyProfile);
router.put(
  '/update-city',
  authMiddleware,
  addDefaultCityValidator,
  addDefaultCity
);

module.exports = router;
