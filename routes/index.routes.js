'use strict';

const router = require('express').Router();

const adminRoute = require('./admin.routes');
const userRoute = require('./user.routes');

router.use('/admin', adminRoute);
router.use('/user', userRoute);

module.exports = router;
