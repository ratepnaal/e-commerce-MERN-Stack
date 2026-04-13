"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productServices_1 = require("../services/productServices");
exports.productRouter = express_1.default.Router();
exports.productRouter.get("/", async (req, res) => {
    try {
        const product = await (0, productServices_1.getAllProduct)();
        res.status(200).send(product);
    }
    catch {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
//# sourceMappingURL=productRoute.js.map