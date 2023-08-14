const mongoose = require('mongoose')
const { Schema } = mongoose

const purchaseSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },

    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    vatTax: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    otherCost: {
        type: Number,
        default: 0
    },

    shippingCost: {
        type: Number,
        default: 0
    },

    grandTotal: {
        type: Number,
        required: true
    },

    note: {
        type: String,
        default: ""
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const PurchaseModel = mongoose.model('purchase', purchaseSchema);
module.exports = PurchaseModel;