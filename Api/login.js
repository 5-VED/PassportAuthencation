const User = require('../Models/model');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { config } = require('../Controllers/config');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../Controllers/passport')(passport);


router.post('/login',  async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(400).send({ message: "Email adress doent exist" });
    }

    if (user) {

        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json({ error: "Invalid Password" });
        }
    }

    const token = jwt.sign({ id: user._id }, config.secret,{expiresIn:'1h'});
    res.send({ user: user, jwtToken: 'JWT ' + token })
});

module.exports = router;


