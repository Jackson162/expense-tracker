const records = require('./data.json').records
const Record = require('../Record')
const User = require('../User')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const fakeUsers = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', async () => {
  await new Promise((resolve, reject) => {
    for (let i = 0; i < fakeUsers.length; i++) {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(fakeUsers[i].password, salt))
        .then(hash => User.create({
          email: fakeUsers[i].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from({ length: 3 }, (_, j) => Record.create(
              { ...records[j + i*3 ], userId }
            ))
          ).then(() => {
            console.log(`user${i} done`)
            if (i === fakeUsers.length -1) resolve()
          })
        })
    }
  })
  process.exit()
})

// db.once('open', async () => {
//   const promiseArray = []
//   await new Promise(function(resolve) { 
//     for (let i = 0; i < fakeUsers.length; i++) {
//       bcrypt
//         .genSalt(10)
//         .then(salt => {
//           return bcrypt.hash(fakeUsers[i].password, salt)
//         })
//         .then(hash => User.create({ 
//             email: fakeUsers[i].email,
//             password: hash
//           }))
//         .then(user => {
//           const userId = user._id
//           const index = i
//           return Promise.all(
//             Array.from({ length: 3 }, (_, j) => Restaurant.create(
//                 {...restaurantList[j+i*3], userId}
//             ))
//           ).then(() => {
//             console.log(`user ${index} done!!!`) 
//             if(index === fakeUsers.length-1) resolve()
//           });
//         })
//     }
//   })
//   process.exit()
// })