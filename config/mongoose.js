const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('detect mongoDB error')
})

db.once('open', () => {
    console.log('mongoDB is connected')
})

module.exports = db