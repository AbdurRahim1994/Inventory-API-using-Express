const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

    status: {
        type: Number,
        default: 0
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const otpModel = mongoose.model('otp', otpSchema)
module.exports = otpModel