import { Document } from "mongoose";

/* =========================
   COMMON INTERFACES
========================= */
export interface IImage {
  url: string;
  publicId: string;
}

export interface ISocialLink {
  platform: string;
  url: string;
}

export interface ILocationVideo {
  type: "upload" | "embed"; // "upload" = Cloudinary URL, "embed" = YouTube/Vimeo URL
  url: string;
  publicId?: string; // only for uploaded videos
}

export interface ILocationBlock {
  title: string;           // e.g. "Dhaka Branch"
  locationName?: string;   // custom display name, falls back to global clubTitle if empty
  description?: string;
  images: IImage[];
  video?: ILocationVideo;
}

export interface IBenefit {
  title: string;
  description?: string;
  icon?: string;
}

export interface IMembershipTier {
  title: string;
  price: number;
  durationInMonths: number;
  features: string[];
  isActive: boolean;
}

/* =========================
   CLUB INTERFACE
========================= */
export interface IClub extends Document {
  clubTitle: string;
  slug: string;
  shortDescription: string;
  clubDescription: string; // rich HTML description

  clubLogo: IImage[];

  clubCategory: string;
  clubPresidentName: string;

  totalMembers: number;
  establishedDate?: Date;

  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };

  socialLinks: ISocialLink[];

  locationImages: ILocationBlock[];

  benefits: IBenefit[];

  membershipTiers: IMembershipTier[];

  status: "active" | "inactive" | "blocked";
}
