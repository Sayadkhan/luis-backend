import express from "express";
import { InquiryControllers } from "./inquiry.controller";

const router = express.Router();

router.post("/", InquiryControllers.createInquiry);
router.get("/", InquiryControllers.getAllInquiries);
router.patch("/:id/read", InquiryControllers.markAsRead);
router.delete("/:id", InquiryControllers.deleteInquiry);

export const InquiryRoutes = router;
