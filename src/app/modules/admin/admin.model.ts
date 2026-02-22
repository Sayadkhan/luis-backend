import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";
import { NameSchema } from "../../schemas/index.schema";

export const AdminSchema = new Schema<TAdmin>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  email: { type: String, unique: true, required: true },
  name: { type: NameSchema, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  image: { type: String },
});

export const AdminModel = model<TAdmin>("Admin", AdminSchema);
