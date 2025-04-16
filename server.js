// server.js - Development Focus (ES Modules Syntax)

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import contactRoutes from "./routes/contact.js";
import quoteRoutes from "./routes/quote.js";

dotenv.config();

if (
  !process.env.MONGODB_URI ||
  !process.env.FRONTEND_URL ||
  !process.env.BACKEND_PORT
) {
  console.error(
    "FATAL ERROR: Missing essential environment variables (MONGODB_URI, FRONTEND_URL, BACKEND_PORT). Check your root .env file."
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.json({ message: "TermiTrack Backend API is running!" });
});

app.use("/api/send-email", contactRoutes);
app.use("/api/send-quote-request", quoteRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "An internal server error occurred.",
  });
});

app.listen(PORT, () => {
  console.log(`Backend server (Dev Mode - ESM) listening on port ${PORT}`);
});
