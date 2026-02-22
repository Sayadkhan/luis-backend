import express from "express";

import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.const";
import { SpotControllers } from "./spot.controller";

const router = express.Router();

router.post("/create-spot", auth(USER_ROLE.admin), SpotControllers.createSpot);
router.get("/", SpotControllers.getAllSpot);
router.get("/locations", SpotControllers.getAllLocations);
router.get("/:location", SpotControllers.getSpotByLocation);
router.get("/details/:title", SpotControllers.getSingleSpot);
router.delete("/delete/:id", auth(USER_ROLE.admin), SpotControllers.deleteSpot);
router.put("/update/:id", auth(USER_ROLE.admin), SpotControllers.updateSpot);

export const SpotRoutes = router;
