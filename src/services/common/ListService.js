const ListService = async (request, model, searchArray) => {
    try {
        const pageNo = Number(request.params.pageNo)
        const perPage = Number(request.params.perPage)
        const { search } = request.params;
        const { email } = request.headers;
        const skipRow = (pageNo - 1) * perPage;
        let data;

        if (search !== "0") {
            const SearchQuery = { $or: searchArray }
            data = await model.aggregate([
                { $match: { $and: [{ userEmail: email }, SearchQuery] } },
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

module.exports = ListService