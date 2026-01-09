import { cartModel, ICart, ICartItems } from "../models/cartModel";
import { IorderItems, OrderModel } from "../models/orderModel";
import { productModel } from "../models/productModel";

interface createcartForUser {
    userid:string;
}

const createcartForUser = async ({userid}:createcartForUser)=>{
const cart = await cartModel.create({userid , totalAmount:0});
await cart.save();
return cart;
}

interface getActiveCartForUser {
    userid:string;
}


export const getActiveCartForUser = async ({userid}:getActiveCartForUser)=>{
let cart = await cartModel.findOne({userid , status:"Active"});

if(!cart){
    cart = await createcartForUser({userid});
}

return cart

}

interface IaddItemToCart {
    productId:any;
    quintity:string;
    userid: string;
}

export const addItemToCart =async  ({productId , quintity , userid } : IaddItemToCart)=>{
const cart = await getActiveCartForUser({userid});

const existInCart = cart.items.find((p)=>p.product.toString() === productId);

if(existInCart){
    return {data:"Items Already  Exist in Cart ! " , statusCode:400}
}

const product = await productModel.findById(productId);

if(!product){
    return {data:"Product Not Found ! " , statusCode:400}
}

if (product.stock < parseInt(quintity)){
    return {data : "Low Stock For Items" , statusCode:400}; 
}
cart.items.push({
    product:productId,
    unitPrice:product.price,
    quintity:parseInt(quintity)
})

cart.totalAmount += product.price * parseInt(quintity);

const updatedCart = await cart.save();

return {data:updatedCart , statusCode:200}

}

interface IupdateItemInCart {
    productId:any;
    quintity:string;
    userid: string;
}

export const updateItemInCart =  async({userid , productId , quintity} : IupdateItemInCart )=>{
const cart = await getActiveCartForUser({userid});
const existInCart = cart.items.find((p)=>p.product.toString() === productId);


if(!existInCart){
    return {data:"Items Not  Exist in Cart ! " , statusCode:400}
}

const product = await productModel.findById(productId);

if(!product){
    return {data:"Product Not Found ! " , statusCode:400}
}

if (product.stock < parseInt(quintity)){
    return {data : "Low Stock For Items" , statusCode:400}; 
}

const othercardItems = cart.items.filter((p)=>p.product.toString() !== productId);

let total = calculateCartTotalItems({cartItems: othercardItems})

existInCart.quintity = parseInt(quintity);

total +=existInCart.quintity * existInCart.unitPrice;

cart.totalAmount = total;

const updatedCart = await cart.save();

return {data:updatedCart , statusCode:200}

};

interface IdeleteItemInCart {
    productId:any;
    userid: string;
}

export const deleteItemInCart =async ({productId , userid}:IdeleteItemInCart)=>{
const cart = await getActiveCartForUser({userid});
const existInCart = cart.items.find((p)=>p.product.toString() === productId);
if(!existInCart){
    return {data:"Items Not  Exist in Cart ! " , statusCode:400}
}
const othercardItems = cart.items.filter((p)=>p.product.toString() !== productId);
let total = calculateCartTotalItems({cartItems: othercardItems})
cart.items = othercardItems;
cart.totalAmount = total;
const updatedCart = await cart.save();

return {data:updatedCart , statusCode:200}
}


const calculateCartTotalItems = ({cartItems}:{cartItems:ICartItems[]})=>{
let total = cartItems.reduce((sum , product)=>{
    sum+=product.quintity * product.unitPrice;
    return sum;
} , 0)

return total;
}

export const ClearCart = async ({userid}:{userid:string})=>{
const cart = await getActiveCartForUser({userid});
cart.items = [];
cart.totalAmount = 0;
const updatedCart = await cart.save();
return {data:updatedCart , statusCode:200}
}

export const checkout = async({userid , address}:{userid:string , address:string})=>{
const cart = await getActiveCartForUser({userid});  

if(!address){
    return {data:"please add the address !" , statusCode:400}
}

const orderItems:IorderItems[] = [];

for(const item of cart.items){
    const product = await productModel.findById(item.product);
    if(!product){
        return {data:"Product Not Found " , statusCode:400}
    }

    const orderItem:IorderItems = {
        productTitle:product.name,
        productImage: product.image,
        quintity:item.quintity,
        unitPrice:item.unitPrice
    }
    orderItems.push(orderItem);
}


const order = await OrderModel.create({
    orderItems,
    total:cart.totalAmount,
    address,
    userid
})

await order.save();

cart.status = "Completed";
await cart.save();

return {data:order , statusCode:200}
}
