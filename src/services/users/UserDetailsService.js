const UserDetailsService = async (request, userModel) => {
    try {

        const { email } = request.headers;
        const user = await userModel.aggregate([
            { $match: { email: email } }
        ])
        return { status: "success", data: user }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserDetailsService