import { Request, Response } from "express";
declare const getLoggedUser: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export default getLoggedUser;
