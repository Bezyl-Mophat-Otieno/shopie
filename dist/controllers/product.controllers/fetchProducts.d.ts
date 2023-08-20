import { Request, Response } from "express";
declare const fetchProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default fetchProducts;
