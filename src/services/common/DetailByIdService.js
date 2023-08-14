const mongoose = require("mongoose");

const DetailByIdService = async (request, model) => {
    try {
        const { email } = request.headers;
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);

        const data = await model.aggregate([
            { $match: { $and: [{ userEmail: email }, { _id: paramId }] } }
        ])

        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = DetailByIdService