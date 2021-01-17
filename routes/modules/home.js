const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const funcs = require('../../functions')
const router = express.Router()

router.get('/', async (req, res) => {
  const userId = req.user._id
  //show category select list
  const categories = await funcs.fetchAllData(Category, '_id')
  const icons = {}
  for (category of categories) {
    icons[category.name] = { name: category.icon }
  }
  //show selected category
  const option = req.query.category 
  let records = await funcs.fetchAllData(Record, '-date', userId)
  if (option) {
    records = !(option === 'all')? records.filter(record => {
      return record.category === option
    }) : records
  }  
  // records = records.map((record) => {
  //   record.date = `${record.date.getFullYear()}/${record.date.getMonth()+1}/${record.date.getDate()}`
  //   return record
  // })
  const totalAmount = records.reduce((acc, record) => {
    return acc + record.amount
  }, 0)
  res.render('index', { records, totalAmount, option, icons, categories })
  
})


module.exports = router