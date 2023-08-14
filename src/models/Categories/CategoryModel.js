const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    userEmail: {
        type: String,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const CategoryModel = mongoose.model('category', categorySchema);
module.exports = CategoryModel