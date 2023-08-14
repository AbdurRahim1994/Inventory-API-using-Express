const UserCreateService = async (request, userModel) => {
    try {
        const postBody = request.body;
        const user = await userModel.create(postBody);
        return { status: "success", data: user }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserCreateService