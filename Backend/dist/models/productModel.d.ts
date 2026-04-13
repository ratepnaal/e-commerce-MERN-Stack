import mongoose, { Document } from "mongoose";
export interface Iproduct extends Document {
    name: string;
    image: string;
    price: number;
    stock: number;
    category: "mobile" | "laptop" | "accessory";
}
export declare const productModel: mongoose.Model<Iproduct, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, Iproduct, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<Iproduct, mongoose.Model<Iproduct, any, any, any, mongoose.Document<unknown, any, Iproduct, any, mongoose.DefaultSchemaOptions> & Iproduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, Iproduct>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Iproduct, mongoose.Document<unknown, {}, Iproduct, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, Iproduct, mongoose.Document<unknown, {}, Iproduct, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, Iproduct, mongoose.Document<unknown, {}, Iproduct, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    image?: mongoose.SchemaDefinitionProperty<string, Iproduct, mongoose.Document<unknown, {}, Iproduct, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    price?: mongoose.SchemaDefinitionProperty<number, Iproduct, mongoose.Document<unknown, {}, Iproduct, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    stock?: mongoose.SchemaDefinitionProperty<number, Iproduct, mongoose.Document<unknown, {}, Iproduct, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    category?: mongoose.SchemaDefinitionProperty<"mobile" | "laptop" | "accessory", Iproduct, mongoose.Document<unknown, {}, Iproduct, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Iproduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Iproduct>, Iproduct>;
//# sourceMappingURL=productModel.d.ts.map