import mongoose, { Schema } from "mongoose";
import { IInquiry } from "./inquiry.interface";

const InquirySchema = new Schema<IInquiry>(
  {
    // Contact form
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, default: "" },
    reason: { type: String, default: "general" },
    // Request-information form
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    guests: { type: String },
    interest: { type: String },
    preferredLocation: { type: String },
    howDidYouHear: { type: String },
    formType: {
      type: String,
      enum: ["contact", "request-information"],
      default: "contact",
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInquiry>("Inquiry", InquirySchema);
