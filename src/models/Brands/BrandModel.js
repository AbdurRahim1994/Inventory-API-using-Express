const mongoose = require('mongoose')
const { Schema } = mongoose

const brandSchema = new Schema({
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

const BrandModel = mongoose.model('brand', brandSchema);
module.exports = BrandModel;