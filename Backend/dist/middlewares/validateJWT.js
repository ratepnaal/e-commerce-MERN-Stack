"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const valditeJWT = async (req, res, next) => {
    const authoraiationHeader = req.get("Authorization");
    if (!authoraiationHeader) {
        res.status(403).send("Authoraization header was not provided");
        return;
    }
    const token = authoraiationHeader.split(" ")[1]?.trim();
    if (!token) {
        res.status(403).send("Bearer token not found");
        return;
    }
    const secretKey = process.env.JWT_SECRET || '';
    if (!secretKey) {
        res.status(500).send("JWT_SECRET is not configured");
        return;
    }
    jsonwebtoken_1.default.verify(token, secretKey, async (err, payload) => {
        if (err) {
            console.log("token :", token);
            res.status(403).send("Invailed token");
            return;
        }
        if (!payload) {
            res.status(403).send("Invailed Token Payload ");
            return;
        }
        const Ipayload = payload;
        const user = await userModel_1.userModel.findOne({ email: Ipayload.email });
        req.user = user;
        next();
    });
};
exports.default = valditeJWT;
//# sourceMappingURL=validateJWT.js.map