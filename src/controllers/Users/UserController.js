const UserModel = require('../../models/Users/UserModel')
const OTPModel = require('../../models/Users/OTPModel')
const UserCreateService = require('../../services/users/UserCreateService')
const UserUpdateervice = require('../../services/users/UserUpdateService')
const UserDetailsService = require('../../services/users/UserDetailsService')
const UserLoginService = require('../../services/users/UserLoginService')
const UserEmailVerifyService = require('../../services/users/UserEmailVerifyService')
const UserOTPVerifyService = require('../../services/users/UserOTPVerifyService')
const UserPassResetService = require('../../services/users/UserPassResetService')

exports.Registration = async (req, res) => {
    const result = await UserCreateService(req, UserModel);
    res.status(200).json(result);
}

exports.Login = async (req, res) => {
    const result = await UserLoginService(req, UserModel);
    res.status(200).json(result)
}

exports.ProfileDetails = async (req, res) => {
    const result = await UserDetailsService(req, UserModel);
    res.status(200).json(result)
}

exports.ProfileUpdate = async (req, res) => {
    const result = await UserUpdateervice(req, UserModel);
    res.status(200).json(result);
}

exports.RecoverVerifyEmail = async (req, res) => {
    const result = await UserEmailVerifyService(req, UserModel, OTPModel);
    res.status(200).json(result);
}

exports.RecoverVerifyOTP = async (req, res) => {
    const result = await UserOTPVerifyService(req, OTPModel);
    res.status(200).json(result);
}

exports.RecoverPassReset = async (req, res) => {
    const result = await UserPassResetService(req, OTPModel, UserModel);
    res.status(200).json(result)
}