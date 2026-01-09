import express from 'express';
import { getAllProduct } from '../services/productServices';

export const productRouter = express.Router();

productRouter.get("/" , async(req , res)=>{
    try{
const product = await getAllProduct();
    res.status(200).send(product)
    }
    catch{
        res.status(500).send(" SomeThing Went Wrong ! ");
    }
})