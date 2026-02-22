import { Document } from "mongoose";
import { IImage } from "../club/club.interface";

export interface IBlog extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  content: string; // rich HTML content
  coverImage?: IImage;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: Date;
}
