const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authFxn } = require('../Controllers/passport');
require('../Controllers/passport');
require('../Controllers/passport')(passport);

router.post('/update', authFxn, (req, res, next) => {
    user = res.json(req.user);
    username = req.user.username;
    lastname = req.user.lastname;

});

module.exports = router;