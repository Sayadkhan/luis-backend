import { Types } from "mongoose";

export type TBooking = {
  client: Types.ObjectId;
  spot: Types.ObjectId;
  price: number;
  startDate: string;
  time: string;
  duration: number;
  basePrice: number;
  totalPrice: number;
};
