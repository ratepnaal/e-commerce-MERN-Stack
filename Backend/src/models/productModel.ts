import mongoose , {Document , Schema} from "mongoose";

 export interface Iproduct extends Document {
    name:string,
    image:string,
    price:number,
    stock:number
}

 const ProductSchema = new Schema<Iproduct>({
    name:{type:String , required:true},
    image:{type:String},
    price:{type:Number , required:true},
    stock:{type:Number , required:true , default:0}
 }) 

 export const productModel = mongoose.model('products' , ProductSchema); 