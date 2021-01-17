const data = require('./data.json')
const Record = require('../Record')
const db = require('../../config/mongoose')

db.once('open', () => {
    const records = data.records
    for (record of records) {
        Record.create({
            name: record.name,
            category: record.category,
            date: record.date,
            amount: record.amount
        })
    }
    console.log('record seed data is created.')
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