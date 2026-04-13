import { NextFunction, Response } from "express";
import { extendRequest } from "../types/ExtendedRequest";
declare const valditeJWT: (req: extendRequest, res: Response, next: NextFunction) => Promise<void>;
export default valditeJWT;
//# sourceMappingURL=validateJWT.d.ts.map