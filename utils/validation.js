const { check, validationResult } = require('express-validator');

exports.validate = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),

    check('lastname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Lastname can not be empty!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),

    check('email')
        .isEmail()
        .withMessage('invalid Email Address')
        .notEmpty()
        .withMessage('Please Enter Email Address'),

    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Minimum 3 characters required!')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array()});
        next();
    }
]