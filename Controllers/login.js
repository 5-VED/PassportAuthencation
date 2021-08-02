const User = require('../Models/model');
const jwt = require('jsonwebtoken');
const { config } = require('../utils/config');
const bcrypt = require('bcrypt');


// const passport = require('../utils/passport');
// require('../utils/passport')(passport);


class userlogin{
    async login(req,res){
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
    res.send( token );
    }
}

module.exports = new userlogin();
