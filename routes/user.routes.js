"use strict";

const router = require("express").Router();

// middleware
const AuthMiddleware = require("../middleware/index.middleware")

// validator
const {signInValidator , checkCityValidator} = require("../validators/index.validator").UserValidator;


// controller
const {signIn , checkRadius , getUserProfile} = require("../controller/index.controller").UserController


router.post('/sign-in' ,signInValidator, signIn)
router.post('/check-radius',AuthMiddleware ,checkCityValidator, checkRadius)
router.get('/get-profile',AuthMiddleware, getUserProfile)



module.exports = router;