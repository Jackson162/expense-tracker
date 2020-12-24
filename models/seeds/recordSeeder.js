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