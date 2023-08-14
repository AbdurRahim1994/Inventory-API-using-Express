const SupplierModel = require('../../models/Suppliers/SupplierModel')
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListService = require('../../services/common/ListService')
const DropDownService = require('../../services/common/DropDownService')
const PurchaseModel = require('../../models/Purchases/PurchaseModel')
const DeleteService = require('../../services/common/DeleteService')
const CheckAssociationService = require('../../services/common/CheckAssociationService')
const DetailByIdService = require('../../services/common/DetailByIdService')

exports.CreateSupplier = async (req, res) => {
    const result = await CreateService(req, SupplierModel);
    res.status(200).json(result);
}

exports.UpdateSupplier = async (req, res) => {
    const result = await UpdateService(req, SupplierModel);
    res.status(200).json(result);
}

exports.SupplierDropDown = async (req, res) => {
    const result = await DropDownService(req, SupplierModel, { _id: 1, name: 1 });
    res.status(200).json(result);
}

exports.SupplierList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ name: searchRegex }, { phone: searchRegex }, { address: searchRegex }, { email: searchRegex }]
    const result = await ListService(req, SupplierModel, searchArray);
    res.status(200).json(result)
}

exports.DeleteSupplier = async (req, res) => {
    const associate = await CheckAssociationService(req, PurchaseModel, 'supplierId')
    if (associate) {
        res.status(200).json({ status: "associate", data: "Associate with purchase" })
    }
    else {
        const result = await DeleteService(req, SupplierModel);
        res.status(200).json(result);
    }
}

exports.SupplierDetailById = async (req, res) => {
    const result = await DetailByIdService(req, SupplierModel);
    res.status(200).json(result);
}