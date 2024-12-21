import express from "express"
import { getUser } from "../controllers/getUser.js";

const router = express.Router();

export default router.post("/",getUser)
