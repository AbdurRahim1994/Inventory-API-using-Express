const PurchaseModel = require('../../models/Purchases/PurchaseModel');

const PurchaseSummaryService = async (request) => {
    try {
        const { email } = request.headers;

        const data = await PurchaseModel.aggregate([
            { $match: { userEmail: email } },
            {
                $facet: {
                    TotalAmount: [{ $group: { _id: 0, total: { $sum: "$grandTotal" } } }],
                    Last30Days: [
                        {
                            $group:
                            {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } },
                                total: { $sum: "$grandTotal" }
                            }
                        },
                        { $sort: { _id: -1 } },
                        { $limit: 30 }
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

module.exports = PurchaseSummaryService