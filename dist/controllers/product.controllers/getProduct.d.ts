import { Request, Response } from "express";
declare const getProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export default getProduct;
