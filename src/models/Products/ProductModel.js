const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    unit: {
        type: String,
        required: true
    },

    details: {
        type: String,
        default: ""
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const ProductModel = mongoose.model('product', productSchema);
module.exports = ProductModel