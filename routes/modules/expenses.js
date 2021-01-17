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
  const userId = req.user._id
  const newExpense = req.body
  newExpense.date = new Date(newExpense.date) //string input => date object
  Record.create({ ...newExpense, userId})
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/edit/:_id', async (req, res) => {
  const userId = req.user._id
  const id = req.params._id
  const categories = await funcs.fetchAllData(Category, '_id')
  const record = await funcs.fetchOneData(Record, id, userId)
  const selectedCategory = {}
  selectedCategory[record.category] = true
  res.render('edit', { categories, record, selectedCategory })
})

router.put('/edit/:_id', async (req, res) => {
  const userId = req.user._id
  const id = req.params._id
  const editedInfo = req.body
  // editedInfo.date = new Date(editedInfo.date)
  await funcs.editOneData(Record, id, editedInfo, userId)
  res.redirect('/')
})

router.delete('/delete/:_id', async (req, res) => {
  const userId = req.user._id
  const id = req.params._id
  await funcs.deleteOneData(Record, id, userId)
  res.redirect('/')
})

module.exports = router

