import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { InquiryServices } from "./inquiry.service";
import { sendInquiryEmail } from "../../utils/sendInquiryEmail";

const createInquiry = catchAsync(async (req, res) => {
  const payload = req.body;

  // Build a unified display name for email
  if (!payload.name && payload.firstName) {
    payload.name = `${payload.firstName} ${payload.lastName || ""}`.trim();
  }

  const result = await InquiryServices.createInquiryIntoDB(payload);

  // Non-blocking email notification
  sendInquiryEmail(payload).catch((err) =>
    console.error("[Inquiry Email Error]", err?.message)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Inquiry submitted successfully",
    data: result,
  });
});

const getAllInquiries = catchAsync(async (req, res) => {
  const result = await InquiryServices.getAllInquiriesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Inquiries retrieved successfully",
    data: result,
  });
});

const markAsRead = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InquiryServices.markInquiryAsRead(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Inquiry marked as read",
    data: result,
  });
});

const deleteInquiry = catchAsync(async (req, res) => {
  const { id } = req.params;
  await InquiryServices.deleteInquiryFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Inquiry deleted",
    data: null,
  });
});

export const InquiryControllers = {
  createInquiry,
  getAllInquiries,
  markAsRead,
  deleteInquiry,
};
