const BrandModel = require('../../models/Brands/BrandModel')
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListService = require('../../services/common/ListService')
const DropDownService = require('../../services/common/DropDownService')
const ProductModel = require('../../models/Products/ProductModel')
const CheckAssociationService = require('../../services/common/CheckAssociationService')
const DeleteService = require('../../services/common/DeleteService')
const DetailByService = require('../../services/common/DetailByIdService')

exports.CreateBrand = async (req, res) => {
    const result = await CreateService(req, BrandModel);
    res.status(200).json(result);
}

exports.UpdateBrand = async (req, res) => {
    const result = await UpdateService(req, BrandModel);
    res.status(200).json(result);
}

exports.BrandDropDown = async (req, res) => {
    const projection = { _id: 1, name: 1 }
    const result = await DropDownService(req, BrandModel, projection)
    res.status(200).json(result);
}

exports.BrandList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ name: searchRegex }]
    const result = await ListService(req, BrandModel, searchArray)
    res.status(200).json(result)
}

exports.DeleteBrand = async (req, res) => {
    const associate = await CheckAssociationService(req, ProductModel, 'brandId');
    if (associate) {
        res.status(200).json({ status: "associate", data: "Associate with product" });
    }
    else {
        const result = await DeleteService(req, BrandModel);
        res.status(200).json(result);
    }
}

exports.BrandDetailById = async (req, res) => {
    const result = await DetailByService(req, BrandModel)
    res.status(200).json(result);
}