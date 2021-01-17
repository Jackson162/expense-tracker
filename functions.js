const Categoty = require('./models/Category')

const convertDateToString = (data) =>　{
  const year = data.date.getFullYear()
  const month = Number(data.date.getMonth()) + 1 < 10? `0${data.date.getMonth()+1}` : `${data.date.getMonth()+1}`
  const date = Number(data.date.getDate()) < 10? `0${data.date.getDate()}` : `${data.date.getDate()}`
  const dateOfdata = `${year}/${month}/${date}`
  return dateOfdata
}

const fetchAllData = async (model, sortOption, userId) => {
  try {
    //catch can detect err on Promise chain (tested)
    let allData = ''
    if (model === Categoty) {
      allData = await model.find().lean().sort(sortOption).then(allData => allData)
    } else {
      allData = await model.find({ userId }).lean().sort(sortOption).then(allData => allData)
      allData = allData.map((data) => {
        data.date = convertDateToString(data)
        return data
      })
    }
    return allData
  } catch(err) {
    console.log(err)
  } 
}

const fetchOneData = (model, _id, userId) => {
  return model.findOne({ _id, userId })
    .lean()
    .then(data => {
      data.date = convertDateToString(data) 
      return data
    })
    .catch(err => console.log(err))
}

const deleteOneData = async (model, _id, userId) => {
 return model.findOne({ _id, userId })
  .then(data => data.remove())
  .catch(err => console.log(err))
}

const editOneData = async (model, _id, editedInfo, userId) => {
  return model.findOne({ _id, userId })
    .then(data => {
      editedInfo.date = new Date(editedInfo.date)
      Object.assign(data, editedInfo)
      data.save()
    })
    .catch(err => console.log(err))
}

module.exports = { fetchAllData, fetchOneData, deleteOneData, editOneData }