import { NextFunction , Request , Response } from "express";
import  jwt  from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { extendRequest } from "../types/ExtendedRequest";


const valditeJWT =async (req:extendRequest , res:Response , next:NextFunction)=>{
const authoraiationHeader = req.get("Authorization");

if(!authoraiationHeader){
    res.status(403).send("Authoraization header was not provided");
    return;
}
const token = authoraiationHeader.split(" ")[1]?.trim();


if(!token){
    res.status(403).send("Bearer token not found");
    return;
}

jwt.verify(token ,"ok12bmw33158pp" ,async (err , payload)=>{
    
if(err){
    console.log("token :",token);
    res.status(403).send("Invailed token");
    return;
}

if(!payload){
    res.status(403).send("Invailed Token Payload ");
    return;
}

const Ipayload = payload as {
    email:string;
    firstName:string;
    lastName:string;
};

const user = await userModel.findOne({email:Ipayload.email})
req.user = user;
next();
})

}

export default valditeJWT;