require('dotenv').config()

const cors = require('cors')
const express = require('express')

const router = require('./router/router')

const app = express()
const port = process.env.API_PORT

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(port, () => {
    console.log('backend app is running on '+port)
})