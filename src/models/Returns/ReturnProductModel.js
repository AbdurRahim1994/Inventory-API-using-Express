const mongoose = require('mongoose')
const { Schema } = mongoose

const returnProductSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },

    returnId: {
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

const ReturnProductModel = mongoose.model('returnproduct', returnProductSchema);
module.exports = ReturnProductModel