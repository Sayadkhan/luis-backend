import { IClub } from "./club.interface";
import clubModel from "./club.model";

const createClubIntoDB = async (payload: Partial<IClub>) => {
  const result = await clubModel.create(payload);
  return result;
};

const getAllClubFromDB = async () => {
  const result = await clubModel.find({ status: "active" }).select(
    "clubTitle slug shortDescription clubLogo clubCategory clubPresidentName totalMembers establishedDate status locationImages createdAt"
  );
  return result;
};

const getClubBySlugFromDB = async (slug: string) => {
  const result = await clubModel.findOne({ slug });
  return result;
};

const updateClubInDB = async (id: string, payload: Partial<IClub>) => {
  const result = await clubModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteClubFromDB = async (id: string) => {
  const result = await clubModel.findByIdAndDelete(id);
  return result;
};

export const ClubServices = {
  createClubIntoDB,
  getAllClubFromDB,
  getClubBySlugFromDB,
  updateClubInDB,
  deleteClubFromDB,
};
