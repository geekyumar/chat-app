const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    username: String,
    sessId: String,
    jwtToken: String,
    expiresIn: String
})

const sessions = mongoose.model('sessions', sessionSchema)
module.exports = sessions