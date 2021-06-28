const express = require('express');
const router  = express.Router();
const { authFxn } = require('../utils/passport');
const {validate} = require('../utils/validation');
const passport = require('passport');
const connectEnsuleLogin = require('connect-ensure-login');
require('../utils/passport')(passport);

//Controllers
const userLogin = require('../Controllers/login');
const userSignup = require('../Controllers/register');
const userUpdate = require('../Controllers/update');


//Login Route
router.post('/login',userLogin.login);

//Signup Route
router.post('/signup',validate,userSignup.signup);

//Update Route
router.put('/update/:id',authFxn,userUpdate.update);


module.exports=router;


