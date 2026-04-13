"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersForUser = exports.checkout = exports.ClearCart = exports.deleteItemInCart = exports.updateItemInCart = exports.addItemToCart = exports.getActiveCartForUser = void 0;
const cartModel_1 = require("../models/cartModel");
const orderModel_1 = require("../models/orderModel");
const productModel_1 = require("../models/productModel");
const createcartForUser = async ({ userid }) => {
    const cart = await cartModel_1.cartModel.create({ userid, totalAmount: 0 });
    await cart.save();
    return cart;
};
const getActiveCartForUser = async ({ userid, populateProducts }) => {
    let cart;
    if (populateProducts) {
        cart = await cartModel_1.cartModel.findOne({ userid, status: "Active" }).sort({ _id: -1 }).populate("items.product");
    }
    else {
        cart = await cartModel_1.cartModel.findOne({ userid, status: "Active" }).sort({ _id: -1 });
    }
    if (!cart) {
        cart = await createcartForUser({ userid });
    }
    return cart;
};
exports.getActiveCartForUser = getActiveCartForUser;
const addItemToCart = async ({ productId, quintity, userid }) => {
    const cart = await (0, exports.getActiveCartForUser)({ userid });
    const existInCart = cart.items.find((p) => p.product.toString() === productId);
    if (existInCart) {
        return { data: "Items Already  Exist in Cart ! ", statusCode: 400 };
    }
    const product = await productModel_1.productModel.findById(productId);
    if (!product) {
        return { data: "Product Not Found ! ", statusCode: 400 };
    }
    if (product.stock < parseInt(quintity)) {
        return { data: "Low Stock For Items", statusCode: 400 };
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quintity: parseInt(quintity)
    });
    cart.totalAmount += product.price * parseInt(quintity);
    await cart.save();
    return { data: await (0, exports.getActiveCartForUser)({ userid,
            populateProducts: true }), statusCode: 200 };
};
exports.addItemToCart = addItemToCart;
const updateItemInCart = async ({ userid, productId, quintity }) => {
    const cart = await (0, exports.getActiveCartForUser)({ userid });
    const existInCart = cart.items.find((p) => p.product.toString() === productId);
    if (!existInCart) {
        return { data: "Items Not  Exist in Cart ! ", statusCode: 400 };
    }
    const product = await productModel_1.productModel.findById(productId);
    if (!product) {
        return { data: "Product Not Found ! ", statusCode: 400 };
    }
    if (product.stock < parseInt(quintity)) {
        return { data: "Low Stock For Items", statusCode: 400 };
    }
    const othercardItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = calculateCartTotalItems({ cartItems: othercardItems });
    existInCart.quintity = parseInt(quintity);
    total += existInCart.quintity * existInCart.unitPrice;
    cart.totalAmount = total;
    await cart.save();
    return { data: await (0, exports.getActiveCartForUser)({ userid,
            populateProducts: true }), statusCode: 200 };
};
exports.updateItemInCart = updateItemInCart;
const deleteItemInCart = async ({ productId, userid }) => {
    const cart = await (0, exports.getActiveCartForUser)({ userid });
    const existInCart = cart.items.find((p) => p.product.toString() === productId);
    if (!existInCart) {
        return { data: "Items Not  Exist in Cart ! ", statusCode: 400 };
    }
    const othercardItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = calculateCartTotalItems({ cartItems: othercardItems });
    cart.items = othercardItems;
    cart.totalAmount = total;
    await cart.save();
    return { data: await (0, exports.getActiveCartForUser)({ userid,
            populateProducts: true }), statusCode: 200 };
};
exports.deleteItemInCart = deleteItemInCart;
const calculateCartTotalItems = ({ cartItems }) => {
    let total = cartItems.reduce((sum, product) => {
        sum += product.quintity * product.unitPrice;
        return sum;
    }, 0);
    return total;
};
const ClearCart = async ({ userid }) => {
    const cart = await (0, exports.getActiveCartForUser)({ userid });
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
};
exports.ClearCart = ClearCart;
const checkout = async ({ userid, address }) => {
    const cart = await (0, exports.getActiveCartForUser)({ userid });
    if (!address) {
        return { data: "please add the address !", statusCode: 400 };
    }
    const orderItems = [];
    for (const item of cart.items) {
        const product = await productModel_1.productModel.findById(item.product);
        if (!product) {
            return { data: "Product Not Found ", statusCode: 400 };
        }
        const orderItem = {
            productTitle: product.name,
            productImage: product.image,
            quintity: item.quintity,
            unitPrice: item.unitPrice
        };
        orderItems.push(orderItem);
    }
    const order = await orderModel_1.OrderModel.create({
        orderItems,
        total: cart.totalAmount,
        address,
        userid
    });
    await order.save();
    cart.status = "Completed";
    await cart.save();
    return { data: order, statusCode: 200 };
};
exports.checkout = checkout;
const getOrdersForUser = async ({ userid }) => {
    const orders = await orderModel_1.OrderModel.find({ userid }).sort({ _id: -1 });
    return { data: orders, statusCode: 200 };
};
exports.getOrdersForUser = getOrdersForUser;
//# sourceMappingURL=cartService.js.map