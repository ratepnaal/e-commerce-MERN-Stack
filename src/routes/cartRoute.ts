import express from'express';
import { getActiveCartForUser } from '../services/cartService';
import valditeJWT from '../middlewares/validateJWT';

export const cartRouter = express.Router();

cartRouter.get('/' ,
    valditeJWT,
    async (req:any , res)=>{
const userid = req.user._id
const cart = await getActiveCartForUser({userid})
res.status(200).send(cart);
})