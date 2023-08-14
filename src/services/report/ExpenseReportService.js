const ExpenseModel = require('../../models/Expenses/ExpenseModel')
const ExpenseReportService = async (request) => {
    try {
        const { email } = request.headers;
        const { fromDate } = request.body;
        const { toDate } = request.body;

        const data = await ExpenseModel.aggregate([
            { $match: { $and: [{ userEmail: email }, { createdDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } }] } },
            {
                $facet: {
                    TotalAmount: [{ $group: { _id: 0, TotalAmount: { $sum: "$amount" } } }],
                    Rows: [{ $lookup: { from: "expensetypes", localField: "typeId", foreignField: "_id", as: "Type" } }]
                }

                // Group wise total expense
                // $facet: {
                //     Total: [{ $group: { _id: "$typeId", TotalAmount: { $sum: "$amount" } } }],
                //     Rows: [{ $lookup: { from: "expensetypes", localField: "typeId", foreignField: "_id", as: "Type" } }]
                // }
            }
        ])

        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }

}

module.exports = ExpenseReportService;