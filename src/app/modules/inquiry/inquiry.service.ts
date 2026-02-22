import InquiryModel from "./inquiry.model";
import { IInquiry } from "./inquiry.interface";

const createInquiryIntoDB = async (payload: Partial<IInquiry>) => {
  return await InquiryModel.create(payload);
};

const getAllInquiriesFromDB = async () => {
  return await InquiryModel.find().sort({ createdAt: -1 });
};

const markInquiryAsRead = async (id: string) => {
  return await InquiryModel.findByIdAndUpdate(id, { status: "read" }, { new: true });
};

const deleteInquiryFromDB = async (id: string) => {
  return await InquiryModel.findByIdAndDelete(id);
};

export const InquiryServices = {
  createInquiryIntoDB,
  getAllInquiriesFromDB,
  markInquiryAsRead,
  deleteInquiryFromDB,
};
