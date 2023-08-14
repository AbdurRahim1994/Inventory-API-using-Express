const ProductModel = require('../../models/Products/ProductModel');
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListTwoJoinService = require('../../services/common/ListTwoJoinService')
const SalesProductModel = require('../../models/Sales/SalesProductModel')
const PurchaseProductModel = require('../../models/Purchases/PurchaseProductModel')
const ReturnProductModel = require('../../models/Returns/ReturnProductModel')
const DeleteService = require('../../services/common/DeleteService')
const CheckAssociationService = require('../../services/common/CheckAssociationService')
const DetailByIdService = require('../../services/common/DetailByIdService');
const DropDownService = require('../../services/common/DropDownService');

exports.CreateProduct = async (req, res) => {
    const result = await CreateService(req, ProductModel);
    res.status(200).json(result);
}

exports.UpdateProduct = async (req, res) => {
    const result = await UpdateService(req, ProductModel);
    res.status(200).json(result);
}

exports.ProductList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const joining = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "Category" } }
    const joining2 = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "Brand" } }
    const searchArray = [{ name: searchRegex }, { unit: searchRegex }, { details: searchRegex }]
    const result = await ListTwoJoinService(req, ProductModel, searchArray, joining, joining2);
    res.status(200).json(result);
}

exports.DeleteProduct = async (req, res) => {
    const purchaseAssociation = await CheckAssociationService(req, PurchaseProductModel, 'productId');
    const salesAssociation = await CheckAssociationService(req, SalesProductModel, 'productId');
    const returnAssociation = await CheckAssociationService(req, ReturnProductModel, 'productId')
    if (purchaseAssociation) {
        res.status(200).json({ status: "associate", data: "Associate with purchase" })
    }
    else if (salesAssociation) {
        res.status(200).json({ status: "associate", data: "Associate with sales" })
    }
    else if (returnAssociation) {
        res.status(200).json({ status: "associate", data: "Associate with returns" })
    }
    else {
        const result = await DeleteService(req, ProductModel);
        res.status(200).json(result);
    }
}

exports.ProductDetailById = async (req, res) => {
    const result = await DetailByIdService(req, ProductModel);
    res.status(200).json(result);
}

exports.ProductDropDown = async (req, res) => {
    const result = await DropDownService(req, ProductModel, { _id: 1, name: 1 })
    res.status(200).json(result);
}