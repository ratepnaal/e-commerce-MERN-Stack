"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const cartService_1 = require("../services/cartService");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
exports.cartRouter = express_1.default.Router();
exports.cartRouter.get('/', validateJWT_1.default, async (req, res) => {
    try {
        const userid = req.user._id;
        const cart = await (0, cartService_1.getActiveCartForUser)({ userid, populateProducts: true });
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.cartRouter.post('/items', validateJWT_1.default, async (req, res) => {
    try {
        const userid = req?.user?._id;
        const { productId, quintity } = req.body;
        const response = await (0, cartService_1.addItemToCart)({ userid, productId, quintity });
        res.status(response.statusCode).send(response.data);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.cartRouter.put("/items", validateJWT_1.default, async (req, res) => {
    try {
        const userid = req?.user?._id;
        const { productId, quintity } = req.body;
        const response = await (0, cartService_1.updateItemInCart)({ userid, productId, quintity });
        res.status(response.statusCode).send(response.data);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.cartRouter.delete("/items/:productId", validateJWT_1.default, async (req, res) => {
    try {
        const userid = req?.user?._id;
        const { productId } = req.params;
        const response = await (0, cartService_1.deleteItemInCart)({ userid, productId });
        res.status(response.statusCode).send(response.data);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.cartRouter.delete("/", validateJWT_1.default, async (req, res) => {
    try {
        const userid = req?.user?._id;
        const response = await (0, cartService_1.ClearCart)({ userid });
        res.status(response.statusCode).send(response.data);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.cartRouter.post("/checkout", validateJWT_1.default, async (req, res) => {
    try {
        const userid = req?.user?._id;
        const { address } = req.body;
        const response = await (0, cartService_1.checkout)({ userid, address });
        res.status(response.statusCode).send(response.data);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
exports.cartRouter.get("/orders", validateJWT_1.default, async (req, res) => {
    try {
        const userid = req?.user?._id;
        const response = await (0, cartService_1.getOrdersForUser)({ userid });
        res.status(response.statusCode).send(response.data);
    }
    catch (err) {
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
});
//# sourceMappingURL=cartRoute.js.map