import { cartModel } from "../models/cartModel";

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