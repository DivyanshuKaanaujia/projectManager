import express from "express";
import { getUser, myProjects } from "../controllers/getUser.js";

const router = express.Router();

router.post("/", getUser);
router.post("/getMyProjects", myProjects);

export default router;
