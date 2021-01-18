const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const User = require('../../models/User')
const authenticatedLogin = require('../../utils/authenticatedLogin')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', authenticatedLogin)

router.get('/register', (req, res) =>　{
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  errors = []
  if (!email || !password || !confirmPassword) errors.push({ message: '打星號的欄位是必填的。' })
  if (password !== confirmPassword) errors.push({ message: '密碼與確認密碼不相符。' })
  if (errors.length > 0) return res.render('register', { name, email, password, confirmPassword, errors })
  //檢查用戶是否已存在
  await User.findOne({ email })
    .then(async user => {
      if (user) {
        errors.push({ message: '此信箱已經註冊。' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      } else {
        await bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({ name, email, password: hash }))
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.error(err))
})

router.post('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

module.exports = router
