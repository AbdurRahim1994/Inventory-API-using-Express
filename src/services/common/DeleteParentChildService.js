const mongoose = require('mongoose');

const DeleteParentChildService = async (request, parentModel, childModel, joinProperty) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const { id } = request.params;
        const paramId = new mongoose.Types.ObjectId(id)
        const { email } = request.headers;

        const parentQuery = {};
        parentQuery.userEmail = email;
        parentQuery._id = paramId
        const parentDelete = await parentModel.deleteMany(parentQuery).session(session)

        const childQuery = {};
        childQuery.userEmail = email;
        childQuery[joinProperty] = paramId;
        const childDelete = await childModel.deleteMany(childQuery).session(session)

        await session.commitTransaction();
        session.endSession();

        return { status: "success", parent: parentDelete, child: childDelete }
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error }
    }
}

module.exports = DeleteParentChildService;