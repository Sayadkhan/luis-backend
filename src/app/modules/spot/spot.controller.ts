import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SpotServices } from "./spot.service";

const createSpot = catchAsync(async (req, res) => {
  const result = await SpotServices.createSpotIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Spot created succesfully",
    data: result,
  });
});
const getAllSpot = catchAsync(async (req, res) => {
  const result = await SpotServices.getAllSpotFromDB();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Spot retived succesfully",
    data: result,
  });
});
const getAllLocations = catchAsync(async (req, res) => {
  const result = await SpotServices.getAllLocations();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Locations retived succesfully",
    data: result,
  });
});

const getSingleSpot = catchAsync(async (req, res) => {
  const result = await SpotServices.getSingleSpotFromDB(req.params.title);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Single spot retived succesfully",
    data: result,
  });
});

const getSpotByLocation = catchAsync(async (req, res) => {
  const result = await SpotServices.getSpotsByLocationFromDB(
    req.params.location
  );

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Spots retived succesfully by location",
    data: result,
  });
});
const updateSpot = catchAsync(async (req, res) => {
  const result = await SpotServices.updateSpotIntoDB(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Spot updated succesfully",
    data: result,
  });
});
const deleteSpot = catchAsync(async (req, res) => {
  const result = await SpotServices.deleteSpotFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Spot deleted succesfully",
    data: result,
  });
});

export const SpotControllers = {
  createSpot,
  getAllSpot,
  getAllLocations,
  getSpotByLocation,
  getSingleSpot,
  deleteSpot,
  updateSpot,
};
