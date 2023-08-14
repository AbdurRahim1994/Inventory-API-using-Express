const PurchaseModel = require('../../models/Purchases/PurchaseModel')
const PurchaseProductModel = require('../../models/Purchases/PurchaseProductModel')
const CreateParentChildService = require('../../services/common/CreateParentChildService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')
const DeleteParentChildService = require('../../services/common/DeleteParentChildService')

exports.CreatePurchase = async (req, res) => {
    const result = await CreateParentChildService(req, PurchaseModel, PurchaseProductModel, 'purchaseId');
    res.status(200).json(result);
}

exports.PurchaseList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ note: searchRegex }]
    const joining = { $lookup: { from: "suppliers", localField: "supplierId", foreignField: "_id", as: "Supplier" } }
    const result = await ListOneJoinService(req, PurchaseModel, searchArray, joining)
    res.status(200).json(result)
}

exports.DeletePurchase = async (req, res) => {
    const result = await DeleteParentChildService(req, PurchaseModel, PurchaseProductModel, 'purchaseId')
    res.status(200).json(result);
}