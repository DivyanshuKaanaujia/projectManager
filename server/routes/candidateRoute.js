import express from "express"
import { getUser, myProjects } from "../controllers/getUser.js";

const router = express.Router();

export default router.post("/",getUser).post("/getMyProjects",myProjects)
