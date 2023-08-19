import dotenv from "dotenv";
import {dbConnection} from "./config/db.js";
dotenv.config();
import express from "express";
import { json } from "express";
import createUserRoute from "./routes/createUser.routes.js";
const app = express()
app.use(json())
const PORT = process.env.PORT 

// Endpoints for my api
app.use('/api/v1/users/',createUserRoute)








app.listen(PORT, async() => {
    await dbConnection()
    console.log(`Server running on port ${PORT}`)
})