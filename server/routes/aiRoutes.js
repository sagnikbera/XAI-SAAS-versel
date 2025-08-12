import express from "express";
import { generateArticle } from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";

// Create a new router instance
const aiRouter = express.Router();

// Define a POST route at "/generate-article"
// 1. When this endpoint is called, it first runs `auth` middleware
//    → This ensures the user is authenticated (logged in)
// 2. If authentication passes, it calls `generateArticle` controller
//    → This will process the AI request and return the generated article
aiRouter.post("/generate-article", auth, generateArticle);

export default aiRouter;
//todo : now Add this router to the main file ->server.js
