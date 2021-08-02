const express = require('express');
const router  = express.Router();
const passportManager = require('../utils/passport');
const {validate} = require('../utils/validation');
const passport = require('passport');

// =======
// const { authFxn } = require('../utils/passport');
// const {validate} = require('../utils/validation');
// const passport = require('passport');
// const connectEnsuleLogin = require('connect-ensure-login');
// require('../utils/passport')(passport);
// >>>>>>> 3dc3f5edae8fec74fa8726011cdead06a76fa84f

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


