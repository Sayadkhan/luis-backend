import express from "express";
import { ClubControllers } from "./club.controller";

const router = express.Router();

router.post("/create-club", ClubControllers.createClub);
router.get("/", ClubControllers.getAllClub);
router.get("/details/:slug", ClubControllers.getClubBySlug);
router.put("/update/:id", ClubControllers.updateClub);
router.delete("/delete/:id", ClubControllers.deleteClub);

export const ClubRoutes = router;
