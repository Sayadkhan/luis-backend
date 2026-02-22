import status from "http-status";
import { AppError } from "../../errors/AppError";
import { TSpot } from "./spot.interface";
import { SpotModel } from "./spot.model";

const createSpotIntoDB = async (payload: TSpot) => {
  const result = await SpotModel.create(payload);
  return result;
};

const getAllSpotFromDB = async () => {
  const result = await SpotModel.find();
  return result;
};

const getAllLocations = async () => {
  const locationStats = await SpotModel.aggregate([
    {
      $group: {
        _id: "$location",
        spotCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        location: "$_id",
        spotCount: 1,
      },
    },
    {
      $sort: { spotCount: -1 },
    },
  ]);

  return locationStats;
};

const getSpotsByLocationFromDB = async (location: string) => {
  const result = await SpotModel.find({ location });
  return result;
};

const getSingleSpotFromDB = async (title: string) => {
  const result = await SpotModel.findOne({ name: title });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Spot not found");
  }
  return result;
};

const updateSpotIntoDB = async (id: string, payload: TSpot) => {
  const result = await SpotModel.findByIdAndUpdate({ _id: id }, payload);
  return result;
};

const deleteSpotFromDB = async (id: string) => {
  const result = await SpotModel.findByIdAndDelete({ _id: id });
  return result;
};

export const SpotServices = {
  createSpotIntoDB,
  getAllSpotFromDB,
  getAllLocations,
  getSpotsByLocationFromDB,
  getSingleSpotFromDB,
  deleteSpotFromDB,
  updateSpotIntoDB,
};
