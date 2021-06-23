const User = require('../Models/model');
const express = require('express');
const { registerValidation } = require('../Controllers/validation');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../Controllers/passport');

router.post('/login', async (req, res) => {
    let user = new User(req.body);
    try {
        user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }


    // const body = req.body;
    // const user = await User.findOne({ email: body.email });
    // if (user) {
    //     // check user password with hashed password stored in the database
    //     const validPassword = await bcrypt.compare(body.password, user.password);
    //     if (validPassword) {
    //         res.status(200).json({ message: "Valid password" });
    //     } else {
    //         res.status(400).json({ error: "Invalid Password" });
    //     }
    // } else {
    //     res.status(401).json({ error: "User does not exist" });
    // }

});

module.exports = router;


