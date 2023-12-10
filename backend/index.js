require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')

const router = require('./router/router')

const app = express()
const port = process.env.API_PORT

app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
    console.log('backend app is running on '+port)
})