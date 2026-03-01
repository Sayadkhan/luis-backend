import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";

const router = express.Router();

router.get("/get-me", UserController.getMe);

router.post(
  "/request-email-change",
  auth(USER_ROLE.admin, USER_ROLE.client),
  UserController.requestEmailChange
);

router.post(
  "/verify-email-change",
  auth(USER_ROLE.admin, USER_ROLE.client),
  UserController.verifyEmailChange
);

export const UserROutes = router;
