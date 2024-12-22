import express from "express"
import { addProject } from "../controllers/projectController.js";

const router = express.Router();

export default router.post("/addProject",addProject)

