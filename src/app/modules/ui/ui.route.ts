import express from "express";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.const";
import { UiControllers } from "./ui.controller";

const router = express.Router();

router.post(
  "/create-ui-data",
  auth(USER_ROLE.admin),
  UiControllers.createUiData
);
router.put(
  "/update-ui-data",
  auth(USER_ROLE.admin),
  UiControllers.updateUiData
);
router.get("/", UiControllers.getUiData);

export const UiRoutes = router;
