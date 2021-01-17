const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
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

router.post('/register', (req, res) => {
  res.send('post register')
})

router.post('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
