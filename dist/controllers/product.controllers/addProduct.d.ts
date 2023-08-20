import { Request, Response } from "express";
declare const addProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default addProduct;
