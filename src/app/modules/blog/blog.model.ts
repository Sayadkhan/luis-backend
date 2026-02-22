import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blog.interface";
import { ImageSchema } from "../../schemas/index.schema";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    shortDescription: { type: String, default: "" },
    content: { type: String, required: true },
    coverImage: { type: ImageSchema },
    author: { type: String, default: "Admin" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

BlogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = generateSlug(this.title);
  }
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model<IBlog>("Blog", BlogSchema);
