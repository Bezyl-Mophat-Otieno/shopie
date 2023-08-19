import DB from "../database/dbHelper/index.js";
import { Request , Response } from "express";
import { StatusCodes } from "http-status-codes";

const fetchUsers = async(req: Request , res: Response)=>{
    try {
        const result = await DB.executeProcedure('fetchUsers')
        const users = result?.recordset[0]
        if(users){
            res.status(StatusCodes.OK).json({users:users})

        }else{
            res.status(StatusCodes.NOT_FOUND).json({message:"Users Not Found"})

        }

        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Something Went Wrong.Server Error"})
        
    }

}



export default fetchUsers