const CreateToken = require('../../utility/TokenUtility')
const UserLoginService = async (request, userModel) => {
    try {
        const { email, password } = request.body;
        const user = await userModel.aggregate([
            { $match: { $and: [{ email: email }, { password: password }] } },
            { $project: { _id: 0, firstName: 1, lastName: 1, mobile: 1, email: 1, photo: 1 } }
        ])
        if (user.length <= 0) {
            return { status: "Invalid email / password" }
        }
        else {
            const token = await CreateToken(user[0]['email'])
            return { status: "success", token: token, data: user[0] }
        }
        
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserLoginService