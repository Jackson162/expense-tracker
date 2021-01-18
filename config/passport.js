const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20')
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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  (accessToken, refreshToken, profile, cb) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) {
          if (!(name === user.name)) return cb(null, false, 
            { message: `用來註冊此信箱之名字與你google帳號名字不符。請問你是\"${user.name}\"嗎?` })
          return cb(null, user)
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({ name, email, password: hash }))
          .then(user => cb(null, user))
          .catch(err => cb(err, false))
      })
      .catch(err => cb(err, false))
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