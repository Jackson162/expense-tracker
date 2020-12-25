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
  const records = await funcs.fetchAllData(Record, '-date')
  res.render('index', { records, icons, categories })
})


module.exports = router