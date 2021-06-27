const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../Models/model');
const bcrypt = require('bcrypt');

router.post('/signup',
    body('username').isString().isLength(3).withMessage('Enter Proper UserName').notEmpty().withMessage('Please Enter your UserName'),
    body('lastname').isString().isLength(4).withMessage('Enter Proper Last Name').notEmpty().withMessage('Please Enter your Last Name'),
    body('email').isEmail().withMessage('invalid Email Address').notEmpty().withMessage('Please Enter Email Address'),
    body('password').isLength(6, 10).withMessage('Password is short').notEmpty().withMessage('Please Enter Password'),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Check If Email Id exist 
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist)
            return res.status(400).json({ error: "Email Id Already Exists" });


        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        /* Create a New User */
        const user = new User({
            username: req.body.username,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedpassword
        });

        try {
            const saveduser = await user.save();
            res.status(201).send({ id: user });
        }
        catch (error) {
            console.log(error);
        }
    });

module.exports = router;