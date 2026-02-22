import express from "express";
import { AdminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.const";

const router = express.Router();

router.post(
  "/create-admin",
  auth(USER_ROLE.admin),
  AdminController.createAdmin
);

export const AdminRoutes = router;
