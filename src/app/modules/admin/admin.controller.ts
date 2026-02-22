import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Admin created successfully",
    data: result,
  });
});

export const AdminController = { createAdmin };
