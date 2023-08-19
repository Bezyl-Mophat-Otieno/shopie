import DB from "../../database/dbHelper/index.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });
    // if you try to update the passsword let's first hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const result = await DB.executeProcedure("updateUser", { ...req.body, id });

    if (result.rowsAffected[0] === 0)
      return res.status(400).json({
        message: "User not found.Therefore not updated",
        status: "failed",
      });
    return res
      .status(200)
      .json({ message: "User updated successfully", status: "success" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export default updateUser;
