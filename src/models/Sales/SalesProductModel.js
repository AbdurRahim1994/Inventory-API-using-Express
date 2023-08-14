const mongoose = require('mongoose')
const { Schema } = mongoose

const saleProductSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },

    salesId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    unitPrice: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const SaleProductModel = mongoose.model('saleproduct', saleProductSchema);
module.exports = SaleProductModel