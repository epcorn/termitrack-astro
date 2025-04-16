import express from "express";
import { handleContactFormSubmission } from "../controllers/contactController.js"; // Adjust path

const router = express.Router();

// POST /api/send-email maps to this route's '/'
router.post("/", handleContactFormSubmission);

export default router;
