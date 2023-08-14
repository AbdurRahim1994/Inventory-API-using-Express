const ReturnModel = require('../../models/Returns/ReturnModel')
const ReturnProductModel = require('../../models/Returns/ReturnProductModel')
const CreateParentChildService = require('../../services/common/CreateParentChildService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')
const DeleteParentChildService = require('../../services/common/DeleteParentChildService')

exports.CreateReturn = async (req, res) => {
    const result = await CreateParentChildService(req, ReturnModel, ReturnProductModel, 'returnId')
    res.status(200).json(result);
}

exports.ReturnList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ note: searchRegex }]
    const joining = { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "Customer" } }
    const result = await ListOneJoinService(req, ReturnModel, searchArray, joining);
    res.status(200).json(result);
}

exports.DeleteReturn = async (req, res) => {
    const result = await DeleteParentChildService(req, ReturnModel, ReturnProductModel, 'returnId');
    res.status(200).json(result);
}