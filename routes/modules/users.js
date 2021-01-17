const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const User = require('../../models/User')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('Post login')
})

router.get('/register', (req, res) =>　{
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  await User.create({ name, email, password, confirmPassword })
    .then(() => res.redirect('/users/login'))
    .catch(err => console.log(err))
})

router.post('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
