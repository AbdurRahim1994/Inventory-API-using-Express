const mongoose = require('mongoose')
const DeleteService = async (request, model) => {
    try {
        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const { email } = request.headers;

        const deleteQuery = {};
        deleteQuery.userEmail = email;
        deleteQuery._id = paramId
        const deletedData = await model.deleteMany(deleteQuery);
        return { status: "success", data: deletedData }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = DeleteService;