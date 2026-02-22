import { TImage } from "../../types/index.type";

export type TSpot = {
  name: string;
  image: TImage[];
  location: string;
  price: string;
  duration: string;
  tourType: string;
  details?: {
    title: string;
    description: string;
  };
  experiences: string[];
  included: {
    title: string;
    isIncluded: boolean;
  }[];

  tourPlan: {
    title: string;
    description: string;
  }[];
};
