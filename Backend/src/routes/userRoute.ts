import express from 'express'
import { Register } from '../services/userServices';
import { Login } from '../services/userServices';

export const router = express.Router();

 router.post("/register" ,async (req , res)=>{
  try{
const {firstName , lastName , email , password} = req.body;

    const {statusCode , data} = await Register({firstName , lastName , email , password})

    res.status(statusCode).send(data)
  }
catch(err: any){
  console.error("Register error:", err);
  res.status(500).send(" SomeThing Went Wrong ! ");
}
    
 })

  router.post("/login" , async (req , res)=>{
    try{
   const {email , password} = req.body;

    const {statusCode , data} = await Login({email , password})
    
    res.status(statusCode).send(data);
    }
    catch(err: any){
      console.error("Login error:", err);
      res.status(500).send(" SomeThing Went Wrong ! ");
    }
  })