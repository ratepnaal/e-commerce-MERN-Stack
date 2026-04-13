interface registerParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare const Register: ({ firstName, lastName, email, password }: registerParams) => Promise<{
    data: string;
    statusCode: number;
}>;
interface loginParams {
    email: string;
    password: string;
}
export declare const Login: ({ email, password }: loginParams) => Promise<{
    data: string;
    statusCode: number;
}>;
export {};
//# sourceMappingURL=userServices.d.ts.map