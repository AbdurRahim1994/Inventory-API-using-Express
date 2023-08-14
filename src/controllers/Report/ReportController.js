const ExpenseReportService = require('../../services/report/ExpenseReportService')
const PurchaseReportService = require('../../services/report/PurchaseReportService')
const SalesReportService = require('../../services/report/SalesReportService')
const ReturnReportService = require('../../services/report/ReturnReportService')

exports.ExpenseByDate = async (req, res) => {
    const result = await ExpenseReportService(req);
    res.status(200).json(result);
}

exports.PurchaseByDate = async (req, res) => {
    const result = await PurchaseReportService(req);
    res.status(200).json(result);
}

exports.SalesByDate = async (req, res) => {
    const result = await SalesReportService(req);
    res.status(200).json(result);
}

exports.ReturnByDate = async (req, res) => {
    const result = await ReturnReportService(req);
    res.status(200).json(result);
}