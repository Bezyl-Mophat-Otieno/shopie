import { Router } from "express";
import addUser from "../controllers/user.contollers/addUser.ts";
import fetchUsers from "../controllers/user.contollers/fetchUsers.ts";
import deleteUser from "../controllers/user.contollers/deleteUser.ts";
import updateUser from "../controllers/user.contollers/updateUser.ts";
import loginUser from "../controllers/user.contollers/loginUser.ts";
import getLoggedUser from "../controllers/user.contollers/getLoggedUser.ts";
import resetPassword from "../controllers/user.contollers/resetPassword.ts";

const userRoutes = Router();

userRoutes.post("/add", addUser);
userRoutes.get("/", fetchUsers);
userRoutes.put("/delete/:id", deleteUser);
userRoutes.put("/:id", updateUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/user", getLoggedUser);
userRoutes.post("/reset", resetPassword);

export default userRoutes;
