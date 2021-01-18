const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const funcs = require('../../functions')
const router = express.Router()
const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

router.get('/', async (req, res) => {
  const userId = req.user._id
  let records = await funcs.fetchAllData(Record, '-date', userId)
  //show category select list
  const categories = await funcs.fetchAllData(Category, '_id')
  const icons = {}
  for (category of categories) {
    icons[category.name] = { name: category.icon }
  }
  //show records with selected month
  const selectedMonth = req.query.month

  if (selectedMonth) {
    records = !(selectedMonth === 'all')? records.filter(record => {
      const stringOfMonthMinusOne = new Date(record.date).getMonth()
      return Number(stringOfMonthMinusOne) + 1  === Number(selectedMonth)
    }) : records
  }
  //show records with selected category
  const selectedCategory = req.query.category 

  if (selectedCategory) {
    records = !(selectedCategory === 'all')? records.filter(record => {
      return record.category === selectedCategory
    }) : records
  }  
  
  const totalAmount = records.reduce((acc, record) => {
    return acc + record.amount
  }, 0)
  res.render('index', { records, totalAmount, selectedCategory, 
    icons, categories, months, selectedMonth })
  
})


module.exports = router