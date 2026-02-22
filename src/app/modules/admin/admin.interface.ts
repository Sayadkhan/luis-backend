import { Types } from "mongoose";
import { TName } from "../../types/index.type";

export type TAdmin = {
  user: Types.ObjectId;
  name: TName;
  email: string;
  password: string;
  image?: string;
  gender: "male" | "female" | "other";
};
