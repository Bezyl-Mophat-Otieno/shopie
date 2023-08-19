import { Router } from "express";
import fetchUsers from '../controllers/fetchUsers.js';
const fetchUserRouter = Router()

fetchUserRouter.get('/',fetchUsers)



export default fetchUserRouter;


