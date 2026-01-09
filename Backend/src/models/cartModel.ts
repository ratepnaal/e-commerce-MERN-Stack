import mongoose , {Document , ObjectId , Schema} from "mongoose";
import { Iproduct } from "./productModel";

const cartStatusEnum = ["Active" , "Completed"]

export interface ICartItems {
    product:Iproduct,
    unitPrice:number,
    quintity:number
} 


 export interface ICart {
    userid:string | ObjectId ,
    items:ICartItems[],
    totalAmount:number,
    status: "Active" | "Completed"
 }

 const cartItemSchema = new Schema<ICartItems>({
    product:{type:Schema.Types.ObjectId , ref:"products" , required:true},
    unitPrice:{type:Number , required:true},
    quintity:{type:Number , required:true , default:1}
 })

 const cartSchema = new Schema<ICart>({
    userid:{type:Schema.Types.ObjectId , ref:"users" , required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number , required:true},
    status:{type:String , default:"Active" , enum:cartStatusEnum  }

 })

 export const cartModel = mongoose.model("Cart" , cartSchema);