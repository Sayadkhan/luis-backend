import { model, Schema } from "mongoose";
import { TUi } from "./ui.interface";
import { ImageSchema } from "../../schemas/index.schema";

const Uischema = new Schema<TUi>({
  logo: { type: ImageSchema },
  bannerImage: { type: ImageSchema },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  travelPhoto: { type: ImageSchema },
  explorePhoto: { type: ImageSchema },
});

export const UiModel = model<TUi>("Ui", Uischema);
