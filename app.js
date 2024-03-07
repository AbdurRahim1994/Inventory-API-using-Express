const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./src/routes/api')

// Security Middleware Import
const cors = require('cors')
const expressMongoSanitize = require('express-mongo-sanitize')
const expressRateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const xssClean = require('xss-clean')

// Security Middleware Implement
app.use(cors())
app.use(expressMongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(xssClean())

// Body Parser Implement
app.use(bodyParser.json())

// Express Rate Limit
const limiter = expressRateLimit({
    windowMs: 1000 * 60 * 15,
    max: 3000
})
app.use(limiter)

// JSON size limit
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))

// Database Connection
const uri = 'mongodb+srv://AbdurRahim:<password>@cluster0.ospelv8.mongodb.net/Inventory-Mgmt?retryWrites=true&w=majority'
const options = { user: 'AbdurRahim', pass: 'up3UWfVQsKvmUpC7' }
mongoose.connect(uri, options)
    .then(() => {
        console.log("Database Connected Successfully")
    })
    .catch((error) => {
        console.log("Database Connection Failed")
    })

// Route Configuration
app.use('/api/v1', router)

// Invalid API Configuration
app.use('*', (req, res) => {
    res.status(404).json({ message: "Failed", data: "Not Found" })
})

module.exports = app;

