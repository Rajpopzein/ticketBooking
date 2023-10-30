const express = require('express')
const app = express()
const router = express.Router()
const userrouter = require('../router/use.router')

router.use('/list',userrouter)


module.exports = router;

