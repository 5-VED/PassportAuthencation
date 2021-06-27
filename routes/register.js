const express = require('express');
const router = express.Router();
const User = require('../Models/model');
const bcrypt = require('bcrypt');
const {validate} = require('../Controllers/validation');
router.post('/signup',validate,async (req, res) => {

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