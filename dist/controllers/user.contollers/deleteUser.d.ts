import { Request, Response } from "express";
declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default deleteUser;
