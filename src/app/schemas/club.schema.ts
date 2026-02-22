import { Schema } from "mongoose";
import { ImageSchema } from "./index.schema";

/* =========================
   SOCIAL LINK SCHEMA
========================= */
export const SocialLinkSchema = new Schema(
  {
    platform: {
      type: String,
      required: true, 
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/* =========================
   LOCATION VIDEO SCHEMA
========================= */
export const LocationVideoSchema = new Schema(
  {
    type: { type: String, enum: ["upload", "embed"], required: true },
    url: { type: String, required: true },
    publicId: { type: String },
  },
  { _id: false }
);

/* =========================
   LOCATION BLOCK SCHEMA
========================= */
export const LocationBlockSchema = new Schema(
  {
    title: { type: String, required: true },
    // Custom display name for this location branch.
    // Falls back to the global clubTitle on the frontend if not provided.
    locationName: { type: String, default: "" },
    description: { type: String },
    images: { type: [ImageSchema], default: [] },
    video: { type: LocationVideoSchema, default: null },
  },
  { _id: false }
);

/* =========================
   BENEFIT SCHEMA
========================= */
export const BenefitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String, // icon name or URL
    },
  },
  { _id: false }
);

/* =========================
   MEMBERSHIP TIER SCHEMA
========================= */
export const MembershipTierSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Silver, Gold, Platinum
    },
    price: {
      type: Number,
      required: true,
    },
    durationInMonths: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);
