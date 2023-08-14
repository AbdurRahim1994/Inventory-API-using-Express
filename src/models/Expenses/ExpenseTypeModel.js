const mongoose = require('mongoose')
const { Schema } = mongoose

const expenseTypeSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const ExpenseTypeModel = mongoose.model('expenseType', expenseTypeSchema)
module.exports = ExpenseTypeModel