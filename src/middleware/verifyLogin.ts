import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Please Provide a token" });
    }
    const decoded = await jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    req.body.user = decoded;
    next();
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: "failed" });
  }
};

export default verifyLogin;
