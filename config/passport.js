/*
**validating user before login using passport.js
*/
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');

module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async function (email, password, done) {
    let doc = await User.findOne({ email: email });
    try {
      if (doc) {
        const valid = await doc.comparePassword(password, doc.password);
        if (valid) {
          done(null, {
            email: doc.email
          });
        } else {
          done(null, false, { message: 'Invalid password' })
        }
      } else {
        done(null, false, { message: 'User does not exist' });
      }
    } catch (done) {
      return done;
    }
  }))
}