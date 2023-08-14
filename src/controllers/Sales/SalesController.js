const SaleModel = require('../../models/Sales/SalesModel')
const SaleProductModel = require('../../models/Sales/SalesProductModel')
const CreateParentChildService = require('../../services/common/CreateParentChildService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')
const DeleteParentChildService = require('../../services/common/DeleteParentChildService')

exports.CreateSales = async (req, res) => {
    const result = await CreateParentChildService(req, SaleModel, SaleProductModel, 'salesId');
    res.status(200).json(result);
}

exports.SalesList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ note: searchRegex }]
    const joining = { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "Customer" } }
    const result = await ListOneJoinService(req, SaleModel, searchArray, joining);
    res.status(200).json(result)
}

exports.DeleteSales = async (req, res) => {
    const result = await DeleteParentChildService(req, SaleModel, SaleProductModel, 'salesId');
    res.status(200).json(result);
}