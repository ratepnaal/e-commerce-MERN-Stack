import mongoose , {Document , Schema} from "mongoose";

 export interface Iproduct extends Document {
    name:string,
    image:string,
    price:number,
   stock:number,
   category: "mobile" | "laptop" | "accessory"
}

 const ProductSchema = new Schema<Iproduct>({
    name:{type:String , required:true},
    image:{type:String},
    price:{type:Number , required:true},
    stock:{type:Number , required:true , default:0},
    category:{type:String, enum:["mobile", "laptop", "accessory"], default:"laptop"}
 }) 

 export const productModel = mongoose.model('products' , ProductSchema); 