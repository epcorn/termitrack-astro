// routes/quote.js (NEW FILE)
import express from "express";
import { handleQuoteRequestSubmission } from "../controllers/contactController.js"; // Or a separate quoteController.js
// Adjust path if you create a separate quoteController

const router = express.Router();

// POST /api/send-quote-request maps to this route's '/'
router.post("/", handleQuoteRequestSubmission);

export default router;
