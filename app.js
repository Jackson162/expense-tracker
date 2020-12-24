const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes/index.js')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(routes)

app.listen(PORT, () => {
    console.log(`The server is listening to http://localhost:${PORT}.`)
})