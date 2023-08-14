const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    mobile: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    photo: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const userModel = mongoose.model('users', userSchema)
module.exports = userModel