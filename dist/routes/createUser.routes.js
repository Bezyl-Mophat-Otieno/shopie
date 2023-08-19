import { Router } from "express";
import addUser from "../controllers/addUser.js";
const createUserRoute = Router();
createUserRoute.post('/add', addUser);
export default createUserRoute;
