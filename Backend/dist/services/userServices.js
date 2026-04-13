"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// دالة التسجيل 
const Register = async ({ firstName, lastName, email, password }) => {
    const findUser = await userModel_1.userModel.findOne({ email });
    if (findUser) {
        return { data: "User Already Exist ! ", statusCode: 400 };
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = new userModel_1.userModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    return { data: generatejwt({ firstName, lastName, email }), statusCode: 200 };
};
exports.Register = Register;
// دالة تسجيل الدخول 
const Login = async ({ email, password }) => {
    const findUser = await userModel_1.userModel.findOne({ email });
    if (!findUser) {
        return { data: " Email Or Password Wrong ! ", statusCode: 400 };
    }
    const passwordMatch = await bcrypt_1.default.compare(password, findUser.password);
    if (passwordMatch) {
        return { data: generatejwt({
                email,
                firstName: findUser.firstName,
                lastName: findUser.lastName
            }), statusCode: 200 };
    }
    return { data: " Email Or Password Wrong ! ", statusCode: 400 };
};
exports.Login = Login;
const secretKey = process.env.JWT_SECRET || '';
const generatejwt = (data) => {
    if (!secretKey) {
        throw new Error("JWT_SECRET is not configured");
    }
    return jsonwebtoken_1.default.sign(data, secretKey, { expiresIn: '24h' });
};
//# sourceMappingURL=userServices.js.map