const express = require('express');
const router  = express.Router();
const passportManager = require('../utils/passport');
const {validate} = require('../utils/validation');
const passport = require('passport');


//Controllers
const userLogin = require('../Controllers/login');
const userSignup = require('../Controllers/register');
const userUpdate = require('../Controllers/update');
const UserGet = require('../Controllers/getUsers');

//Login Route
router.post('/login',userLogin.login);

//Signup Route
router.post('/signup',validate,userSignup.signup);

//Update Route
router.put('/update/:id',passportManager.authenticate,userUpdate.update);

//getting a User
router.get('/getuser',UserGet.getuser);

module.exports=router;


