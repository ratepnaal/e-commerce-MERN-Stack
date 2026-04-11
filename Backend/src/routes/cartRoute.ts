import express from'express';
import { addItemToCart, checkout, ClearCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from '../services/cartService';
import valditeJWT from '../middlewares/validateJWT';
import { extendRequest } from '../types/ExtendedRequest';

export const cartRouter = express.Router();

cartRouter.get('/' ,
    valditeJWT,
    async (req:extendRequest , res)=>{
        try{
const userid = req.user._id
const cart = await getActiveCartForUser({userid , populateProducts:true});
res.status(200).send(cart);
        }
catch(err){
res.status(500).send(" SomeThing Went Wrong ! ");
}
})

cartRouter.post('/items' , valditeJWT , async (req : extendRequest , res)=>{

    try{
const userid = req?.user?._id;

const {productId , quintity } = req.body;

const response = await addItemToCart({userid , productId , quintity});
res.status(response.statusCode).send(response.data);

    }
catch(err){
res.status(500).send(" SomeThing Went Wrong ! ");
}
})

cartRouter.put("/items" , valditeJWT , async (req : extendRequest , res)=>{
    try{

const userid = req?.user?._id;

const {productId , quintity} = req.body;

const response = await updateItemInCart({userid , productId , quintity})
res.status(response.statusCode).send(response.data);
    }
    catch(err){
res.status(500).send(" SomeThing Went Wrong ! ");
    }
})
    


cartRouter.delete("/items/:productId" , valditeJWT , async (req : extendRequest , res)=>{

    try{
 const userid = req?.user?._id;
    const { productId } = req.params; 

    const response = await deleteItemInCart({userid , productId})
    res.status(response.statusCode).send(response.data);

    }
   catch(err){
res.status(500).send(" SomeThing Went Wrong ! ");
   }
})

cartRouter.delete("/" , valditeJWT , async (req:extendRequest , res)=>{
    try{
   const userid = req?.user?._id;
    const response =  await ClearCart({userid});
    res.status(response.statusCode).send(response.data);
    }
 catch(err){
res.status(500).send(" SomeThing Went Wrong ! ");
 }
})

cartRouter.post("/checkout" , valditeJWT , async (req : extendRequest , res)=>{
    try{
 const userid = req?.user?._id;
    const {address} = req.body;
    const response = await checkout({userid , address});
   res.status(response.statusCode).send(response.data);
    }
   catch(err){
    res.status(500).send(" SomeThing Went Wrong ! ");
   }
})
