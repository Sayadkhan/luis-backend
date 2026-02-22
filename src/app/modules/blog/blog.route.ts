import express from "express";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.post("/create", BlogControllers.createBlog);
router.get("/", BlogControllers.getAllBlogs);
router.get("/details/:slug", BlogControllers.getBlogBySlug);
router.put("/update/:id", BlogControllers.updateBlog);
router.delete("/delete/:id", BlogControllers.deleteBlog);

export const BlogRoutes = router;
