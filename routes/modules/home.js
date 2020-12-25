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
  const records = await funcs.fetchAllData(Record, '-date')
  if (!option) {
    return res.render('index', { records, option, icons, categories })
  } else {
    const filteredRecords = !(option === 'all')? records.filter(record => {
      return record.category === option
    }) : records
    res.render('index', { records: filteredRecords, option, icons, categories })
  }
})


module.exports = router