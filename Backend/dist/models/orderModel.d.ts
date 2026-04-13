import mongoose, { Document, ObjectId } from "mongoose";
export interface IorderItems {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quintity: number;
}
export interface Iorder extends Document {
    orderItems: IorderItems[];
    total: number;
    address: string;
    userid: ObjectId | string;
}
export declare const OrderModel: mongoose.Model<Iorder, {}, {}, {}, mongoose.Document<unknown, {}, Iorder, {}, mongoose.DefaultSchemaOptions> & Iorder & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, Iorder>;
//# sourceMappingURL=orderModel.d.ts.map