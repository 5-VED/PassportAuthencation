const User = require('../Models/model'),
     Strategy = require('passport-jwt').Strategy,
     ExtractJwt = require('passport-jwt').ExtractJwt;
const { config } = require('./config');
const passport = require('passport');

passport.initialize();

module.exports = function (passport) {
var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey : config.secret
}
passport.use(new Strategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));
return passport.initialize(); 
}

const authFxn = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) throw err;
        if (!user) {
            return res.json('Your Token is expired');
        }
        req.user = user;
        return next();
    })(req, res, next);
}

module.exports.authFxn = authFxn;



