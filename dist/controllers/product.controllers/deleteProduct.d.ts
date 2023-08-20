import { Request, Response } from "express";
declare const deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default deleteProduct;
