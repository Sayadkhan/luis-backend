import status from "http-status";
import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(status.FORBIDDEN, "forbidden");
  }
  const result = await UserServices.getMe(token);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User retrived successfully",
    data: result,
  });
});

const requestEmailChange = catchAsync(async (req, res) => {
  const result = await UserServices.requestEmailChange(req.user, req.body.newEmail, req.body.currentPassword);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Verification code sent to your new email",
    data: result,
  });
});

const verifyEmailChange = catchAsync(async (req, res) => {
  const result = await UserServices.verifyEmailChange(req.user, req.body.code);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Email updated successfully",
    data: result,
  });
});

export const UserController = { getMe, requestEmailChange, verifyEmailChange };
