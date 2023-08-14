const CustomerModel = require('../../models/Customers/CustomerModel')
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListService = require('../../services/common/ListService')
const DropDownService = require('../../services/common/DropDownService')
const SalesModel = require('../../models/Sales/SalesModel')
const ReturnModel = require('../../models/Returns/ReturnModel')
const DeleteService = require('../../services/common/DeleteService')
const CheckAssociationService = require('../../services/common/CheckAssociationService')
const DetailByIdService = require('../../services/common/DetailByIdService')

exports.CreateCustomer = async (req, res) => {
    const result = await CreateService(req, CustomerModel);
    res.status(200).json(result)
}

exports.UpdateCustomer = async (req, res) => {
    const result = await UpdateService(req, CustomerModel);
    res.status(200).json(result);
}

exports.CustomerDropDown = async (req, res) => {
    const result = await DropDownService(req, CustomerModel, { _id: 1, name: 1 })
    res.status(200).json(result)
}

exports.CustomerList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ name: searchRegex }, { phone: searchRegex }, { email: searchRegex }, { address: searchRegex }]
    const result = await ListService(req, CustomerModel, searchArray);
    res.status(200).json(result)
}

exports.DeleteCustomer = async (req, res) => {
    const associate = await CheckAssociationService(req, SalesModel, 'customerId');
    const returnAssociate = await CheckAssociationService(req, ReturnModel, 'customerId')
    if (associate) {
        res.status(200).json({ status: "associate", data: "Associate with sales" })
    }
    else if (returnAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with returns" })
    }
    else {
        const result = await DeleteService(req, CustomerModel);
        res.status(200).json(result);
    }
}

exports.CustomerDetailById = async (req, res) => {
    const result = await DetailByIdService(req, CustomerModel);
    res.status(200).json(result);
}