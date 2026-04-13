"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userServices_1 = require("../services/userServices");
const userServices_2 = require("../services/userServices");
exports.router = express_1.default.Router();
exports.router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { statusCode, data } = await (0, userServices_1.Register)({ firstName, lastName, email, password });
        res.status(statusCode).json(data);
    }
    catch (err) {
        console.error("Register error:", err);
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { statusCode, data } = await (0, userServices_2.Login)({ email, password });
        res.status(statusCode).json(data);
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
//# sourceMappingURL=userRoute.js.map