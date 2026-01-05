import mongoose , {Document , ObjectId, Schema} from "mongoose";


export interface IorderItems {
    productTitle:string;
    productImage:string;
    unitPrice:number;
    quintity:number;
}

export interface Iorder extends Document {
    orderItems:IorderItems[];
    total:number;
    address:string;
    userid:ObjectId | string;
}

const orderItemSchema = new Schema<IorderItems>({
productTitle:{type:String , required:true},
productImage:{type:String , required:true},
unitPrice:{type:Number , required:true},
quintity:{type:Number , required:true}
})

const orderSchema = new Schema<Iorder>({
orderItems:[orderItemSchema],
total:{type:Number , required:true},
address:{type:String , required:true},
userid:{type:Schema.Types.ObjectId , ref:"users" , required:true}
})

export const OrderModel = mongoose.model<Iorder>("Order" , orderSchema)