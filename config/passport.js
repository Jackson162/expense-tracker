const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      const userInput = { email, password }
      User.findOne({ email }) 
        .then(user => {
          if (!user) return done(null, false, { login_error: '此信箱未註冊!', userInput })
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return done(null, false , { login_error: '信箱或密碼錯誤!', userInput })
            return done(null, user) 
          })
        })
        .catch(err => done(err, false))
    }
  ))

  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err =>　done(err, false))
  })
}