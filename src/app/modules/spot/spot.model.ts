import { model, Schema } from "mongoose";
import { TSpot } from "./spot.interface";
import { ImageSchema } from "../../schemas/index.schema";

const SpotSchema = new Schema<TSpot>({
  name: { type: String, required: true },
  image: { type: [ImageSchema], required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  tourType: { type: String, required: true },
  details: { type: { title: String, description: String } },
  experiences: { type: [String], required: true },
  included: { type: [{ title: String, isIncluded: Boolean }], required: true },
  tourPlan: { type: [{ title: String, description: String }], required: true },
});

export const SpotModel = model<TSpot>("Spot", SpotSchema);
 
