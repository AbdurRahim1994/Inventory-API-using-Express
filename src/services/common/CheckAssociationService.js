const mongoose = require("mongoose");

const CheckAssociationService = async (request, associatedModel, joiningProperty) => {
    try {

        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const { email } = request.headers;

        const queryObject = {};
        queryObject[joiningProperty] = paramId
        const data = await associatedModel.aggregate([
            { $match: { $and: [{ userEmail: email }, queryObject] } }
        ])

        return data.length > 0
    }
    catch (error) {
        return false;
    }
}

module.exports = CheckAssociationService;