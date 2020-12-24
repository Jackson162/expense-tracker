const Record = require('./models/Record')
const Category = require('./models/Category')

const fetchAllData = async (model, sortOption) => {
  try {
    //catch can detect err on Promise chain (tested)
    const allData = await model.find().lean().sort(sortOption).then(allData => allData) 
    return allData
  } catch(err) {
    console.log(err)
  } 
}

const fetchOneData = async (model, id) => {
  return model.findById(id)
    .lean()
    .then(data => data)
    .catch(err => console.log(err))
}

module.exports = { fetchAllData, fetchOneData }