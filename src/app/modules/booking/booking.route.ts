import express from "express";

import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post("/book-now", BookingControllers.addBooking);
router.get("/", BookingControllers.getAllBookings);
router.get("/my-bookings", BookingControllers.getAllBookingsByLoggedUser);

export const BookingRoutes = router;
