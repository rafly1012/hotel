import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import roomRoutes from "./routes/roomRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

// Middleware JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/rooms", roomRoutes);

export default app;
