import { Request, Response } from "express";
declare const addUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default addUser;
