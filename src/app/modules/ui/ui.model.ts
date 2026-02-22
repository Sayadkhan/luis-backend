import { model, Schema } from "mongoose";
import { TUi } from "./ui.interface";
import { ImageSchema } from "../../schemas/index.schema";

const Uischema = new Schema<TUi>({
  logo: { type: ImageSchema, required: true },
  bannerImage: { type: ImageSchema, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  travelPhoto: { type: ImageSchema, required: true },
  explorePhoto: { type: ImageSchema, required: true },
});

export const UiModel = model<TUi>("Ui", Uischema);
