const mongoose = require('mongoose')
const UpdateService = async (request, model) => {
    try {
        const { email } = request.headers;
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id)
        const postBody = request.body;
        const data = await model.updateOne({ _id: paramId, userEmail: email }, postBody);
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UpdateService