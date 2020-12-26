const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const funcs = require('../../functions')
const router = express.Router()

router.get('/', async (req, res) => {
  const categories = await funcs.fetchAllData(Category, '_id')
  const icons = {}
  for (category of categories) {
    icons[category.name] = { name: category.icon }
  }
  const option = req.query.category 
  let records = await funcs.fetchAllData(Record, '-date')
  if (option) {
    records = !(option === 'all')? records.filter(record => {
      return record.category === option
    }) : records
  } 
  const totalAmount = records.reduce((acc, record) => {
    return acc + record.amount
  }, 0)
  res.render('index', { records, totalAmount, option, icons, categories })
  
})


module.exports = router