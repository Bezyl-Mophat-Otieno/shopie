import { Request, Response } from "express";
declare const fetchUsers: (req: Request, res: Response) => Promise<void>;
export default fetchUsers;
