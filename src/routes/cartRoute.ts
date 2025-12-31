import express from'express';
import { addItemToCart, getActiveCartForUser } from '../services/cartService';
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