import express from "express";
import candidateRoutes from "./candidateRoute.js";
import projectRoutes from "./projectRoute.js";

const router = express.Router();

router.use("/", candidateRoutes);
router.use("/", projectRoutes);

export default router;
