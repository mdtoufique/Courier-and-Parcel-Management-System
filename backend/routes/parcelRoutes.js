import express from "express";
import {
  createParcel,
  getParcels,
  updateParcel,
  deleteParcel
} from "../controllers/parcelController.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createParcel);
router.get("/", verifyToken, getParcels);
router.put("/:id", verifyToken, updateParcel);
router.delete("/:id", verifyToken, deleteParcel);

export default router;

