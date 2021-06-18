const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../models/user');
const { SECRET_KEY } = require('../keys/keys');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findOne({ _id: jwt_payload._id }).select({
        password: 0,
        email: 0,
        date: 0,
      });

      if (user) return done(null, user);
      return done(null, false);
    })
  );
};
