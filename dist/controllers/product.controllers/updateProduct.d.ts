import { Request, Response } from "express";
declare const updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default updateProduct;
