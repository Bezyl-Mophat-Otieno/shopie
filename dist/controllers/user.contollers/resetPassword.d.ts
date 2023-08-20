import { Request, Response } from "express";
declare const resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default resetPassword;
