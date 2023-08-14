const ListTwoJoinService = async (request, model, searchArray, joining, joining2) => {
    try {
        const { email } = request.headers;
        const pageNo = Number(request.params.pageNo)
        const perPage = Number(request.params.perPage)
        const { search } = request.params;
        const skipRow = (pageNo - 1) * perPage
        let data;

        if (search !== "0") {
            const searchQuery = { $or: searchArray }
            data = await model.aggregate([
                { $match: { $and: [{ userEmail: email }, searchQuery] } },
                joining,
                joining2,
                {
                    $facet: {
                        Total: [{ $count: "total" }],
                        Row: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }
        else {
            data = await model.aggregate([
                { $match: { userEmail: email } },
                joining,
                joining2,
                {
                    $facet: {
                        Total: [{ $count: "total" }],
                        Row: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ])
        }

        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = ListTwoJoinService