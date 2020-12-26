const fetchAllData = async (model, sortOption) => {
  try {
    //catch can detect err on Promise chain (tested)
    const allData = await model.find().lean().sort(sortOption).then(allData => allData) 
    return allData
  } catch(err) {
    console.log(err)
  } 
}

const fetchOneData = (model, id) => {
  return model.findById(id)
    .lean()
    .then(data => data)
    .catch(err => console.log(err))
}

const deleteOneData = async (model, id) => {
 return model.findById(id)
  .then(data => data.remove())
  .catch(err => console.log(err))
}

const editOneData = async (model, id, editedInfo) => {
  return model.findById(id)
    .then(data => {
      Object.assign(data, editedInfo)
      data.save()
    })
    .catch(err => console.log(err))
}

module.exports = { fetchAllData, fetchOneData, deleteOneData, editOneData }