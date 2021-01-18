if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../Category')
const data = require('./data.json')

db.once('open', async () => {
  const categories = data.categories
  for (category of categories) {
    await Category.create({
        name: category.name,
        icon: category.icon
      }).then(() => console.log('data added'))
      console.log('loop ends')
  }
  console.log('category seed data is created.')
  process.exit()
})


//fail test data added after console.log(promise)
// db.once('open', () => {
//   const categories = data.categories

//   const promise = new Promise((res, rej) => {
//     for (category of categories) {
//        Category.create({
//         name: category.name,
//         icon: category.icon
//       }).then(() => console.log('data added'))
//       console.log('loop ends')
//     }
//   })
//   promise.then(() => {
//     console.log('category seed data is created.')
//     process.exit()
//   })
//   console.log(promise)
// })