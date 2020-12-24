const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const router = express.Router()

const fetchAllData = async (model) => {
  try {
    //catch can detect err on Promise chain (tested)
    const allData = await model.find().lean().then(allData => allData) 
    return allData
  } catch(err) {
    console.log(err)
  } 
}

router.get('/', async (req, res) => {
  const categories = await fetchAllData(Category)
  const icons = {}
  for (category of categories) {
    icons[category.name] = { name: category.icon }
  }
  const records = await fetchAllData(Record)
  res.render('index', { records, icons, categories })
})


module.exports = router