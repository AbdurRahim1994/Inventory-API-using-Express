const UserOTPVerifyService = async (request, otpModel) => {
    try {
        const { OTPCode } = request.body;
        const { email } = request.params;
        const otpCount = await otpModel.aggregate([
            { $match: { $and: [{ email: email }, { otp: OTPCode }, { status: 0 }] } },
            { $count: "total" }
        ])
        if (otpCount.length <= 0) {
            return { status: "Invalid OTP Code" }
        }
        else {
            const otpUpdate = await otpModel.updateOne({ email: email, otp: OTPCode, status: 0 }, { status: 1 })
            return { status: "success", data: otpUpdate }
        }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserOTPVerifyService