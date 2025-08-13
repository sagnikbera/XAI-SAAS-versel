import express from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";

// Create a new router instance
const aiRouter = express.Router();

// Define a POST route at "/generate-article"
// 1. When this endpoint is called, it first runs `auth` middleware
//    → This ensures the user is authenticated (logged in)
// 2. If authentication passes, it calls `generateArticle` controller
//    → This will process the AI request and return the generated article

// 1 ------------------------------------------------------------------
aiRouter.post("/generate-article", auth, generateArticle);
// 2 ------------------------------------------------------------------
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
// 3
aiRouter.post("/generate-image", auth, generateImage);
// 4 ------------------------------------------------------------------
aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground
);
// 5 ------------------------------------------------------------------
aiRouter.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  removeImageObject
);
// 6 ------------------------------------------------------------------
aiRouter.post(
  "/resume-review",
  upload.single("resume"),
  auth,
  resumeReview
);


export default aiRouter;
//todo : now Add this router to the main file ->server.js
