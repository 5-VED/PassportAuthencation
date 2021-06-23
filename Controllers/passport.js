const User = require('../Models/model');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { config } = require('./config');


module.exports = function (passport) {

    passport.use(
        new Strategy(
            {
                secretOrkey: config.passport.secret,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            function(jwt_payload,done){
                console.log(jwt_payload);
                User.findOne({id:jwt_payload._id},function(error,user){
                    if(error){
                        return done(error,false)
                    }
                    if(user){
                        return done(null,user);
                    }
                    else{
                        return done(null,false);
                    }
                });
            }
        )
    )
}








// passport.use(new Strategy(params, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload._id }, (error, user) => {
//         if (error) {
//             return done(error, false);
//         }

//         if (user) {
//             return done(null, user);
//         }
//         else {
//             return done(null, false);
//         }
//     });
// }));