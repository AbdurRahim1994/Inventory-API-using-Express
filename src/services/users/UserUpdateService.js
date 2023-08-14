const UserUpdateService = async (request, userModel) => {
    try {
        const { email } = request.headers;
        const postBody = request.body;
        const user = await userModel.updateOne({ email: email }, postBody);
        return { status: "success", data: user }
    }
    catch (error) {
        return { status: "fail", data: error }
    }

}

module.exports = UserUpdateService