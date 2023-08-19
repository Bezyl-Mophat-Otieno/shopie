import { Request, Response } from "express";
import DB from "../../database/dbHelper/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // fetch the user from the database
    const result = await DB.executeProcedure("getUser", { email });
    const user = result.recordset[0];
    if (result.recordset.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    } else {
      if (user.deleted === true) {
        return res.status(400).json({ message: "Your account is deactivated" });
      }
      // compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // create a token
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY!, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "Login successful", token, status: "success" });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid credentials", status: "false" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export default loginUser;
