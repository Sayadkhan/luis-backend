import { Document } from "mongoose";

export interface IInquiry extends Document {
  // Contact form fields
  name: string;
  email: string;
  message: string;
  reason: string;
  // Request-information page fields
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  state?: string;
  guests?: string;
  interest?: string;
  preferredLocation?: string;
  howDidYouHear?: string;
  formType: "contact" | "request-information";
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}
