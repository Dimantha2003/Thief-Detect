import express from "express";
import multer from "multer";

import {
  addCriminal,
  getAllCriminals,
  updateCriminal,
  deleteCriminal,
  getCriminalById,
} from "../controllers/criminalController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// CREATE
router.post("/", upload.array("photos", 5), addCriminal);

// READ
router.get("/", getAllCriminals);
router.get("/:id", getCriminalById);

// UPDATE
router.put("/:id", updateCriminal);

// DELETE
router.delete("/:id", deleteCriminal);

export default router;