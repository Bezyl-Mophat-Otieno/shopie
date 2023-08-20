import { Request, Response } from "express";
declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default updateUser;
