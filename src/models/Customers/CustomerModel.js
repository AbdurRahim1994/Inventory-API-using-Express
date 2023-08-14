const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        default: ""
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const CustomerModel = mongoose.model('customer', customerSchema);
module.exports = CustomerModel