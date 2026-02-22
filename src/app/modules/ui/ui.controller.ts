import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UiServices } from "./ui.service";

const createUiData = catchAsync(async (req, res) => {
  const result = await UiServices.createUiDataIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Ui data created successfully",
    data: result,
  });
});
const updateUiData = catchAsync(async (req, res) => {
  const result = await UiServices.updateUiDataIntoDB(req.body, req.body._id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Ui data updated successfully",
    data: result,
  });
});
const getUiData = catchAsync(async (req, res) => {
  const result = await UiServices.getUiDataFromDB();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Ui data retrievied successfully",
    data: result,
  });
});

export const UiControllers = { createUiData, updateUiData, getUiData };
