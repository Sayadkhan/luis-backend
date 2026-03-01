import { z } from "zod";

const ImageValidationSchema = z.object({
  url: z.string().optional(),
  publicId: z.string().optional(),
});

const createUiDataValidationSchema = z.object({
  body: z.object({
    logo: ImageValidationSchema.optional(),
    bannerImage: ImageValidationSchema.optional(),
    whatsapp: z.string(),
    email: z.string().email(),
    address: z.string(),
    travelPhoto: ImageValidationSchema.optional(),
    explorePhoto: ImageValidationSchema.optional(),
  }),
});

const updateUiDataValidationSchema = z.object({
  body: z.object({
    _id: z.string().optional(),
    logo: ImageValidationSchema.optional(),
    bannerImage: ImageValidationSchema.optional(),
    whatsapp: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    travelPhoto: ImageValidationSchema.optional(),
    explorePhoto: ImageValidationSchema.optional(),
  }),
});

export const UiValidations = {
  createUiDataValidationSchema,
  updateUiDataValidationSchema,
};
