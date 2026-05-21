import express from "express";

import {
  createAlert,
  getAlerts,
} from "../controllers/alertController.js";

const router = express.Router();

// AI Detection Endpoint
router.post("/", createAlert);

// Alert History
router.get("/", getAlerts);

export default router;