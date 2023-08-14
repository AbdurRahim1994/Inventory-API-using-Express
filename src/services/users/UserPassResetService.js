const UserPassResetService = async (request, otpModel, userModel) => {
    try {
        const { email, password, OTPCode } = request.body;
        const otpUsedCount = await otpModel.aggregate([
            { $match: { $and: [{ email: email }, { otp: OTPCode }, { status: 1 }] } },
            { $count: "total" }
        ])
        if (otpUsedCount.length <= 0) {
            return { status: "Invalid Request" }
        }
        else {
            const updatePassword = await userModel.updateOne({ email: email }, { password: password })
            return { status: "success", data: updatePassword }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserPassResetService