const registerValidation = function (req, res, next) {
    if (req.body.email || req.body.email == '') {
        req.checkbody('email').isEmail().withMessage('Invalid Email Address').notEmpty().withMessage('Please Enter Email Address');
    }
    if (req.body.password || req.body.password == '') {
        req.checkbody('password').len(6, 10).withMessage('Password is short').notEmpty().withMessage('Please Enter Password');
    }

    const error = req.validationErrors()
    if (error) {
        res.send(error);
    }
    next();
}

module.exports.registerValidation = registerValidation;

