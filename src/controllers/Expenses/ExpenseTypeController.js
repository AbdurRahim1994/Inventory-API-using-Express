const ExpenseTypeModel = require('../../models/Expenses/ExpenseTypeModel');
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListService = require('../../services/common/ListService')
const DropDownService = require('../../services/common/DropDownService')
const CheckAssociationService = require('../../services/common/CheckAssociationService')
const ExpenseModel = require('../../models/Expenses/ExpenseModel')
const DeleteService = require('../../services/common/DeleteService')
const DetailByIdService = require('../../services/common/DetailByIdService')

exports.CreateExpenseType = async (req, res) => {
    const result = await CreateService(req, ExpenseTypeModel);
    res.status(200).json(result);
}

exports.UpdateExpenseType = async (req, res) => {
    const result = await UpdateService(req, ExpenseTypeModel);
    res.status(200).json(result);
}

exports.ExpenseTypeDropDown = async (req, res) => {
    const result = await DropDownService(req, ExpenseTypeModel, { _id: 1, name: 1 })
    res.status(200).json(result);
}

exports.ExpenseTypeList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ name: searchRegex }]
    const result = await ListService(req, ExpenseTypeModel, searchArray)
    res.status(200).json(result)
}

exports.DeleteExpenseType = async (req, res) => {
    const associate = await CheckAssociationService(req, ExpenseModel, 'typeId');
    if (associate) {
        res.status(200).json({ status: "associate", data: "Associate with expense" })
    }
    else {
        const result = await DeleteService(req, ExpenseTypeModel);
        res.status(200).json(result)
    }
}

exports.ExpenseTypeDetailById = async (req, res) => {
    const result = await DetailByIdService(req, ExpenseTypeModel);
    res.status(200).json(result);
}