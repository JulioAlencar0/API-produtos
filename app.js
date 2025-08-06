const express = require('express')
const app = express()
const pool = require('./src/config/db.js')
const routesProdutos = require('./src/routes/routesProdutos.js')

app.use(express.json())

app.use('/produtos', routesProdutos)
module.exports = app
