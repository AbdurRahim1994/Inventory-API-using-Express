const mongoose = require('mongoose');

const CreateParentChildService = async (request, parentModel, childModel, joinProperty) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const { parent } = request.body;
        parent.userEmail = request.headers.email;
        const parentCreate = await parentModel.create([parent], { session })

        const { child } = request.body;
        await child.forEach((element) => {
            element.userEmail = request.headers.email;
            element[joinProperty] = parentCreate[0]['_id']
        })

        const childCreate = await childModel.insertMany(child, { session })

        await session.commitTransaction();
        session.endSession();

        return { status: "success", parent: parentCreate, child: childCreate }
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error }
    }
}

module.exports = CreateParentChildService;