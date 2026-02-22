import mongoose, { Schema } from "mongoose";
import { IClub } from "./club.interface";
import { ImageSchema } from "../../schemas/index.schema";
import { BenefitSchema, LocationBlockSchema, MembershipTierSchema, SocialLinkSchema } from "../../schemas/club.schema";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ClubSchema = new Schema<IClub>(
  {
    clubTitle: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, sparse: true },
    shortDescription: { type: String, default: "" },
    clubDescription: { type: String, required: true },
    clubLogo: { type: [ImageSchema], required: true },
    clubCategory: { type: String, required: true },
    clubPresidentName: { type: String, required: true },
    totalMembers: { type: Number, default: 0 },
    establishedDate: { type: Date },

    contactInfo: {
      phone: String,
      email: String,
      address: String,
    },

    socialLinks: [SocialLinkSchema],
    status: { type: String, default: "active" },

    locationImages: [LocationBlockSchema],

    benefits: [BenefitSchema],
    membershipTiers: [MembershipTierSchema],
  },
  { timestamps: true }
);

// Auto-generate slug from clubTitle before save
ClubSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = generateSlug(this.clubTitle);
  }
  next();
});

export default mongoose.model<IClub>("Club", ClubSchema);
