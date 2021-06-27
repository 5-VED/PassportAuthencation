const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authFxn } = require('../Controllers/passport');
const User = require('../Models/model');
require('../Controllers/passport');
require('../Controllers/passport')(passport);

router.put('/update/:id', authFxn, async (req, res, next) => {
    //const user = res.json(req.user) ;

    const user = await new User({
        _id: req.params.id,
        username: req.body.username,
        lastname: req.body.lastname
    });


    User.updateOne({
        _id: req.params.id,
    }, user).then(
        () => {
            res.status(201).json({
                username: 'Username updated Succesfully',
                lastname: 'lastname updated Succesfully'
            })
        }
    ).catch((
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    ))
});

module.exports = router;