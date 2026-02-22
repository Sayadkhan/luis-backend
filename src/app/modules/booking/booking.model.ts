import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>({
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  spot: { type: Schema.Types.ObjectId, ref: "Spot", required: true },
  startDate: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

export const BookingModel = model<TBooking>("Booking", BookingSchema);
