const PurchaseProductModel = require('../../models/Purchases/PurchaseProductModel')

const PurchaseReportService = async (request) => {
    try {
        const { email } = request.headers;
        const { fromDate } = request.body;
        const { toDate } = request.body;

        const data = await PurchaseProductModel.aggregate([
            { $match: { $and: [{ userEmail: email }, { createdDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } }] } },
            {
                $facet: {
                    TotalAmount: [{ $group: { _id: 0, TotalAmount: { $sum: "$totalPrice" } } }],
                    Rows: [
                        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "Product" } },
                        // { $unwind: "$Product" },
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

module.exports = PurchaseReportService