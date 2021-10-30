const connectTOMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectTOMongo()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(process.env.PORT || 3000)