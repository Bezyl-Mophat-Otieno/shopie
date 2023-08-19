import { Router } from "express";
import fetchUsers from '../controllers/fetchUsers.js';
import addUser from "../controllers/addUser.js";
const userRoutes = Router();
userRoutes.post('/add', addUser);
userRoutes.get('/', fetchUsers);
export default userRoutes;
