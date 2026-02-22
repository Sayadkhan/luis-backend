import { Router } from "express";
import { CategoryControllers } from "./category.controller";

const router = Router();

router.post("/create-category", CategoryControllers.createCategory);
router.get("/", CategoryControllers.getAllCategories);
router.patch("/:id", CategoryControllers.updateCategory);
router.delete("/:id", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
