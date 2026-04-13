import { ICart } from "../models/cartModel";
interface getActiveCartForUser {
    userid: string;
    populateProducts?: boolean;
}
export declare const getActiveCartForUser: ({ userid, populateProducts }: getActiveCartForUser) => Promise<import("mongoose").Document<unknown, {}, ICart, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICart & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
interface IaddItemToCart {
    productId: any;
    quintity: string;
    userid: string;
}
export declare const addItemToCart: ({ productId, quintity, userid }: IaddItemToCart) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, ICart, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    };
    statusCode: number;
}>;
interface IupdateItemInCart {
    productId: any;
    quintity: string;
    userid: string;
}
export declare const updateItemInCart: ({ userid, productId, quintity }: IupdateItemInCart) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, ICart, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    };
    statusCode: number;
}>;
interface IdeleteItemInCart {
    productId: any;
    userid: string;
}
export declare const deleteItemInCart: ({ productId, userid }: IdeleteItemInCart) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, ICart, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    };
    statusCode: number;
}>;
export declare const ClearCart: ({ userid }: {
    userid: string;
}) => Promise<{
    data: import("mongoose").Document<unknown, {}, ICart, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<ICart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    };
    statusCode: number;
}>;
export declare const checkout: ({ userid, address }: {
    userid: string;
    address: string;
}) => Promise<{
    data: string;
    statusCode: number;
} | {
    data: import("mongoose").Document<unknown, {}, import("../models/orderModel").Iorder, {}, import("mongoose").DefaultSchemaOptions> & import("../models/orderModel").Iorder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    statusCode: number;
}>;
export declare const getOrdersForUser: ({ userid }: {
    userid: string;
}) => Promise<{
    data: (import("mongoose").Document<unknown, {}, import("../models/orderModel").Iorder, {}, import("mongoose").DefaultSchemaOptions> & import("../models/orderModel").Iorder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[];
    statusCode: number;
}>;
export {};
//# sourceMappingURL=cartService.d.ts.map