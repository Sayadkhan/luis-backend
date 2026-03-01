import express from "express";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.const";
import { UiControllers } from "./ui.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UiValidations } from "./ui.validation";

const router = express.Router();

router.post(
  "/create-ui-data",
  auth(USER_ROLE.admin),
  validateRequest(UiValidations.createUiDataValidationSchema),
  UiControllers.createUiData
);
router.put(
  "/update-ui-data",
  auth(USER_ROLE.admin),
  validateRequest(UiValidations.updateUiDataValidationSchema),
  UiControllers.updateUiData
);
router.get("/", UiControllers.getUiData);

export const UiRoutes = router;
