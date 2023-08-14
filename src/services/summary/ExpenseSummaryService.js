const ExpenseModel = require('../../models/Expenses/ExpenseModel')

const ExpenseSummaryService = async (request) => {
    try {
        const { email } = request.headers;

        const data = await ExpenseModel.aggregate([
            { $match: { userEmail: email } },
            {
                $facet: {
                    TotalAmount: [{ $group: { _id: 0, total: { $sum: "$amount" } } }],
                    Last30Days: [{
                        $group:
                        {
                            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } },
                            total: { $sum: "$amount" }
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

module.exports = ExpenseSummaryService