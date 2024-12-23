import express from "express";
import { acceptProject, addProject, getAllProjects, updateTask } from "../controllers/projectController.js";

const router = express.Router();

router.post("/addProject", addProject);
router.post("/acceptProject", acceptProject);
router.get("/allProjects", getAllProjects);
router.post("/updateTask", updateTask);

export default router;
