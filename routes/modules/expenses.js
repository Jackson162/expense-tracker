const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const funcs = require('../../functions')
const router = express.Router()

router.get('/new', async (req, res) => {
  const categories = await funcs.fetchAllData(Category, '_id')
  res.render('new', { categories })
})

router.post('/new', (req, res) => {
  const newExpense = req.body
  Record.create(newExpense)
    .then(() => res.redirect('/'))
    .catch(err => err)
})

router.get('/edit/:_id', async (req, res) => {
  const id = req.params._id
  const record = await funcs.fetchOneData(Record, id)
  console.log(record)
  const categories = await funcs.fetchAllData(Category, '_id')
  res.render('edit', { categories, record })
})

module.exports = router

