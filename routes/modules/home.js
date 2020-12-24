const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const funcs = require('../../functions')
const router = express.Router()


// const fetchAllData = async (model, sortOption) => {
//   try {
//     //catch can detect err on Promise chain (tested)
//     const allData = await model.find().lean().sort(sortOption).then(allData => allData) 
//     return allData
//   } catch(err) {
//     console.log(err)
//   } 
// }

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