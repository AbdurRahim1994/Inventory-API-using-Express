const ExpenseModel = require('../../models/Expenses/ExpenseModel');
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')
const DeleteService = require('../../services/common/DeleteService')
const DetailByIdService = require('../../services/common/DetailByIdService')

exports.CreateExpense = async (req, res) => {
    const result = await CreateService(req, ExpenseModel);
    res.status(200).json(result);
}

exports.UpdateExpense = async (req, res) => {
    const result = await UpdateService(req, ExpenseModel);
    res.status(200).json(result);
}

exports.ExpenseList = async (req, res) => {
    const { search } = req.params;
    const joining = { $lookup: { from: "expensetypes", localField: "typeId", foreignField: "_id", as: "Type" } }
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ note: searchRegex }, { "Type.name": searchRegex }]
    const result = await ListOneJoinService(req, ExpenseModel, searchArray, joining)
    res.status(200).json(result)
}

exports.DeleteExpense = async (req, res) => {
    const result = await DeleteService(req, ExpenseModel);
    res.status(200).json(result);
}

exports.ExpenseDetailById = async (req, res) => {
    const result = await DetailByIdService(req, ExpenseModel);
    res.status(200).json(result);
}