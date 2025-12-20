import express from 'express';
import { getAllProduct } from '../services/productServices';

export const productRouter = express.Router();

productRouter.get("/" , async(req , res)=>{
    const product = await getAllProduct();
    res.status(200).send(product)
})