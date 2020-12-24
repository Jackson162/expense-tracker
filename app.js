const express = require('express')

const routes = require('./routes/index.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(routes)

app.listen(PORT, () => {
    console.log(`The server is listening to http://localhost:${PORT}.`)
})