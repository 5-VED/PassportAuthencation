const User = require("../Models/model"),
  Strategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const { config } = require("./config");
const passport = require("passport");
const user = require("../Controllers/login");

//passport.initialize();

// module.exports = function (passport) {
//   var opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
//     secretOrKey: config.secret,
//   };

//   passport.use(
//     new Strategy(opts, function (jwt_payload, done) {
//       User.findOne({ _id: jwt_payload.id }, function (err, user) {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       });
//     })
//   );
//   return passport.initialize();
// };

// const authFxn = function (req, res, next) {
//   passport.authenticate("jwt", function (err, user, info) {
//     if (err) {
//       res.json({ err: "Some Problem Occured" });
//     }
//     if (!user) {
//       res.json({ err: user });
//     }
//     req.user = user;
//     return next();
//   })(req, res, next);
// };

// module.exports.authFxn = authFxn;

class passportManager {
  initialize() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret,
      };
    passport.use(
      new Strategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.id }, function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
    );
    return passport.initialize();
  }

  authenticate(req, res, next) {
    passport.authenticate("jwt", function (err, user, info) {
      if (err) {
        res.json({ err: "Some Problem Occured" });
      }
      if (!user) {
        res.json({ err: 'no auth user' });
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
}

module.exports=new passportManager();
