require('dotenv').config()

const express = require('express')

const app = express()
const port = process.env.API_PORT

app.listen(port, () => {
    console.log('backend app is running on '+port)
})