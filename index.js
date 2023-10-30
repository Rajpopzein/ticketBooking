const express = require("express")
const cors = require('cors')
const indexrouter = require('./router/index.router.js')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }))


app.use("/ticket",indexrouter)

const port = 8081

app.listen(port,()=>{
    console.log("server is running")
})