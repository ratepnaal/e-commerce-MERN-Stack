import mongoose, { ObjectId, Schema } from "mongoose";
import { Iproduct } from "./productModel";
export interface ICartItems {
    product: Iproduct;
    unitPrice: number;
    quintity: number;
}
export interface ICart {
    userid: string | ObjectId;
    items: ICartItems[];
    totalAmount: number;
    status: "Active" | "Completed";
}
export declare const cartModel: mongoose.Model<ICart, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, ICart, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICart & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<ICart, mongoose.Model<ICart, any, any, any, mongoose.Document<unknown, any, ICart, any, mongoose.DefaultSchemaOptions> & ICart & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, ICart>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICart, mongoose.Document<unknown, {}, ICart, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICart & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userid?: mongoose.SchemaDefinitionProperty<string | Schema.Types.ObjectId, ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICart & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    items?: mongoose.SchemaDefinitionProperty<ICartItems[], ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICart & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    totalAmount?: mongoose.SchemaDefinitionProperty<number, ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICart & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: mongoose.SchemaDefinitionProperty<"Active" | "Completed", ICart, mongoose.Document<unknown, {}, ICart, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ICart & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ICart>, ICart>;
//# sourceMappingURL=cartModel.d.ts.map