const ReturnProductModel = require('../../models/Returns/ReturnProductModel')

const ReturnReportService = async (request) => {
    try {
        const { email } = request.headers;
        const { fromDate } = request.body;
        const { toDate } = request.body;

        const data = await ReturnProductModel.aggregate([
            { $match: { $and: [{ userEmail: email }, { createdDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } }] } },
            {
                $facet: {
                    TotalAmount: [{ $group: { _id: 0, TotalAmount: { $sum: "$totalPrice" } } }],
                    Rows: [
                        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "Product" } },
                        { $lookup: { from: "brands", localField: "Product.brandId", foreignField: "_id", as: "Brand" } },
                        { $lookup: { from: "categories", localField: "Product.categoryId", foreignField: "_id", as: "Category" } }
                    ]
                }
            }
        ])

        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = ReturnReportService