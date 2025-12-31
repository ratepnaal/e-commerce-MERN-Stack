import { cartModel } from "../models/cartModel";
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