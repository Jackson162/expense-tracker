const db = require('../../config/mongoose')
const Category = require('../Category')
const data = require('./data.json')

db.once('open', () => {
  const categories = data.categories
  for (category of categories) {
    Category.create({
      name: category.name,
      icon: category.icon
    })
  }
  console.log('category seed data is created.')
})