import { userModel } from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// نوع مدخلات التسجيل 

interface registerParams {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

// دالة التسجيل 

export const Register = async({firstName , lastName , email , password } : registerParams)=>{

    const findUser = await userModel.findOne({email});

    if(findUser){
        return {data:"User Already Exist ! " , statusCode:400}
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const newUser = new userModel({firstName , lastName , email , password : hashedPassword});
    await newUser.save();

    return {data:generatejwt({firstName , lastName , email}) , statusCode:200}


} 

// نوع مدخلات تسجيل الدخول 

interface loginParams {
    email:string;
    password:string;
}

// دالة تسجيل الدخول 

export const Login = async ({email , password}:loginParams)=>{
    
    const findUser = await userModel.findOne({email})

    if(!findUser){
        return {data:" Email Or Password Wrong ! " , statusCode:400}
    }

    const passwordMatch = await bcrypt.compare(password , findUser.password)

    if(passwordMatch){
        return {data:generatejwt({
            email ,
             firstName:findUser.firstName,
             lastName:findUser.lastName
            }) , statusCode:200};
    }

    return {data:" Email Or Password Wrong ! " , statusCode:400}

}
const secretKey = process.env.JWT_SECRET || '';

const generatejwt = (data: any)=>{
    if(!secretKey){
        throw new Error("JWT_SECRET is not configured");
    }
    return jwt.sign(data , secretKey , { expiresIn: '24h' })
}

