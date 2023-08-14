const CategoryModel = require('../../models/Categories/CategoryModel')
const CreateService = require('../../services/common/CreateService')
const UpdateService = require('../../services/common/UpdateService')
const ListService = require('../../services/common/ListService')
const DropDownService = require('../../services/common/DropDownService')
const ProductModel = require('../../models/Products/ProductModel')
const DeleteService = require('../../services/common/DeleteService')
const CheckAssociationService = require('../../services/common/CheckAssociationService')
const DetailByIdService = require('../../services/common/DetailByIdService')

exports.CreateCategory = async (req, res) => {
    const result = await CreateService(req, CategoryModel);
    res.status(200).json(result)
}

exports.UpdateCategory = async (req, res) => {
    const result = await UpdateService(req, CategoryModel);
    res.status(200).json(result)
}

exports.CategoryDropDown = async (req, res) => {
    const projection = { _id: 1, name: 1 }
    const result = await DropDownService(req, CategoryModel, projection);
    res.status(200).json(result);
}

exports.CategoryList = async (req, res) => {
    const { search } = req.params;
    const searchRegex = { "$regex": search, "$options": "i" }
    const searchArray = [{ name: searchRegex }]
    const result = await ListService(req, CategoryModel, searchArray);
    res.status(200).json(result)
}

exports.DeleteCategory = async (req, res) => {
    const associate = await CheckAssociationService(req, ProductModel, 'categoryId');
    if (associate) {
        res.status(200).json({ status: "associate", data: "Associate with product" })
    }
    else {
        const result = await DeleteService(req, CategoryModel);
        res.status(200).json(result)
    }
}

exports.CategoryDetailById = async (req, res) => {
    const result = await DetailByIdService(req, CategoryModel);
    res.status(200).json(result);
}
