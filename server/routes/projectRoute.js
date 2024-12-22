import express from "express"
import { acceptProject, addProject, getAllProjects, updateTask } from "../controllers/projectController.js";

const router = express.Router();

export default router.post("/addProject",addProject).post("/acceptProject",acceptProject).
get("/allProjects",getAllProjects).post("/updateTask",updateTask)

