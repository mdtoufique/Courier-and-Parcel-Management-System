import express from "express";
import { getUsersByRole } from "../controllers/userController.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userRole", verifyToken, getUsersByRole);


export default router;

