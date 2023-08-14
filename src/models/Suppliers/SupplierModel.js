const moongose = require('mongoose')
const { Schema } = moongose

const supplierSchema = new Schema({
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

const SupplierModel = moongose.model('supplier', supplierSchema);
module.exports = SupplierModel