import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { AppError } from "../../errors/AppError";

const addBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.addBookingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Booking successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Bookings retrived successfully",
    data: result,
  });
});
const getAllBookingsByLoggedUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(status.FORBIDDEN, "forbidden");
  }
  const result = await BookingServices.getAllBookingsByLoggedUserFromDB(token);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Bookings retrived successfully by logged user",
    data: result,
  });
});

export const BookingControllers = {
  addBooking,
  getAllBookings,
  getAllBookingsByLoggedUser,
};
