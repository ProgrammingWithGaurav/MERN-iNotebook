if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose')
const mongoURI = process.env.DATABASE_URL

const connectTOMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to Mongo Successfully')
    })
}

module.exports = connectTOMongo