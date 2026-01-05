import express from'express';
import { addItemToCart, checkout, ClearCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from '../services/cartService';
import valditeJWT from '../middlewares/validateJWT';
import { extendRequest } from '../types/ExtendedRequest';

export const cartRouter = express.Router();

cartRouter.get('/' ,
    valditeJWT,
    async (req:extendRequest , res)=>{
const userid = req.user._id
const cart = await getActiveCartForUser({userid})
res.status(200).send(cart);
})

cartRouter.post('/items' , valditeJWT , async (req : extendRequest , res)=>{

const userid = req?.user?._id;

const {productId , quintity } = req.body;

const response = await addItemToCart({userid , productId , quintity});
res.status(response.statusCode).send(response.data);
})

cartRouter.put("/items" , valditeJWT , async (req : extendRequest , res)=>{
const userid = req?.user?._id;

const {productId , quintity} = req.body;

const response = await updateItemInCart({userid , productId , quintity})
res.status(response.statusCode).send(response.data);
})

cartRouter.delete("/items/:productId" , valditeJWT , async (req : extendRequest , res)=>{
    const userid = req?.user?._id;
    const { productId } = req.params; 

    const response = await deleteItemInCart({userid , productId})
    res.status(response.statusCode).send(response.data);
})

cartRouter.delete("/" , valditeJWT , async (req:extendRequest , res)=>{
    const userid = req?.user?._id;
    const response =  await ClearCart({userid});
    res.status(response.statusCode).send(response.data);
})

cartRouter.post("/checkout" , valditeJWT , async (req : extendRequest , res)=>{
    const userid = req?.user?._id;
    const {address} = req.body;
    const response = await checkout({userid , address});
   res.status(response.statusCode).send(response.data);
})
