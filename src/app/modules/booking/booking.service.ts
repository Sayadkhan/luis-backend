import status from "http-status";
import { AppError } from "../../errors/AppError";
import { ClientModel } from "../client/client.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { verifyToken } from "../auth/auth.utils";

const addBookingIntoDB = async (payload: TBooking) => {
  const result = await BookingModel.create(payload);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find().populate("client").populate("spot");
  return result;
};

const getAllBookingsByLoggedUserFromDB = async (token: string) => {
  const decoded = verifyToken(token);
  const { email } = decoded;
  const client = await ClientModel.findOne({ email });

  if (!client) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const bookings = await BookingModel.find({ client: client._id })
    .populate("client")
    .populate("spot");
  return bookings;
};

export const BookingServices = {
  addBookingIntoDB,
  getAllBookingsFromDB,
  getAllBookingsByLoggedUserFromDB,
};
