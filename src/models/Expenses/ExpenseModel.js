const mongoose = require('mongoose')
const { Schema } = mongoose

const expenseSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },

    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    amount: {
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

const ExpenseModel = mongoose.model('expense', expenseSchema);
module.exports = ExpenseModel