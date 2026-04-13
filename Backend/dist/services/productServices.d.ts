export declare const getAllProduct: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/productModel").Iproduct, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<import("../models/productModel").Iproduct & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const seedInitialProducts: () => Promise<void>;
//# sourceMappingURL=productServices.d.ts.map