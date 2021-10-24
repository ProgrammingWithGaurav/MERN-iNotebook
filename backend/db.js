const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectTOMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to Mongo Successfully')
    })
}

module.exports = connectTOMongo