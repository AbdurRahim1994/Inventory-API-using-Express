const SendEmail = require('../../utility/EmailUtility')
const UserEmailVerifyService = async (request, userModel, otpModel) => {
    try {
        const { email } = request.params;
        const user = await userModel.aggregate([
            { $match: { email: email } }, { $count: "total" }
        ])
        if (user.length <= 0) {
            return { status: "Invalid email" }
        }
        else {
            const OTPCode = Math.floor(100000 + Math.random() * 900000)
            const postBody = {
                email: email,
                otp: OTPCode
            }
            const OTP = await otpModel.create(postBody);
            const sendEmail = await SendEmail(email, "Your PIN Code is = " + OTPCode, "Inventory PIN Verification")
            return { status: "success", data: sendEmail }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserEmailVerifyService