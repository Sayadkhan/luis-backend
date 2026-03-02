import catchAsync from "../../utils/catchAsync";
import status from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { ClubServices } from "./club.service";
import {AppError} from "../../errors/AppError";

const createClub = catchAsync(async (req, res) => {
  const result = await ClubServices.createClubIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "Club created successfully",
    data: result,
  });
});

const getAllClub = catchAsync(async (req, res) => {
  const result = await ClubServices.getAllClubFromDB();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Clubs retrieved successfully",
    data: result,
  });
});

const getClubBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await ClubServices.getClubBySlugFromDB(slug);

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Club not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Club retrieved successfully",
    data: result,
  });
});

const updateClub = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClubServices.updateClubInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Club updated successfully",
    data: result,
  });
});

const deleteClub = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ClubServices.deleteClubFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Club deleted successfully",
    data: null,
  });
});

export const ClubControllers = {
  createClub,
  getAllClub,
  getClubBySlug,
  updateClub,
  deleteClub,
};
