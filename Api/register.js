const express = require('express');
const router = express.Router();
const { registerValidation } = require('../Controllers/validation');
const User = require('../Models/model');
const {body,validationResult}=require('express-validator');

router.post('/signup', 
body('username').isLength(3).withMessage('Username is short').isEmpty().withMessage('Enter Username'),
body('lastname').isLength(6,10).withMessage('Lastname is short').isEmpty().withMessage('Enter Lastname'),
body('email').isEmail().withMessage('In correct email id').isEmpty().withMessage('Enter Email Address'),
body('password').isLength(6,10).withMessage('Password is short').isEmpty().withMessage('Enter password'),
async(req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    //Checking if email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email Already Exist');
    }

    //Hashing a Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Creating a new User
    user =  User({
        username: req.body.username,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });
    
});

module.exports = router;