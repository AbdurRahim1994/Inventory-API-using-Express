const DropDownService = async (request, model, projection) => {
    try {
        const { email } = request.headers;
        const data = await model.aggregate([
            { $match: { userEmail: email } },
            { $project: projection }
        ])
        if (data.length <= 0) {
            return { status: "fail", data: "No data found" }
        }
        else {
            return { status: "success", data: data }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = DropDownService