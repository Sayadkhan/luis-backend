import { JwtPayload } from "jsonwebtoken";
import status from "http-status";
import { AppError } from "../../errors/AppError";
import { AdminModel } from "../admin/admin.model";
import { verifyToken } from "../auth/auth.utils";
import { ClientModel } from "../client/client.model";
import { UserModel } from "./user.model";
import { SendEmail } from "../../utils/sendEmail";
import mongoose from "mongoose";

const getMe = async (token: string) => {
  const decoded = verifyToken(token);
  const { email, role } = decoded;

  let result = null;

  if (role === "client") {
    result = await ClientModel.findOne({ email }).populate("user");
  }
  if (role === "admin") {
    result = await AdminModel.findOne({ email }).populate("user");
  }

  return result;
};

const requestEmailChange = async (user: JwtPayload, newEmail: string) => {
  const isUserExists = await UserModel.findOne({ email: user.email });

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const isEmailTaken = await UserModel.findOne({ email: newEmail });
  if (isEmailTaken) {
    throw new AppError(status.BAD_REQUEST, "Email already in use");
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await UserModel.findOneAndUpdate(
    { email: user.email },
    {
      verificationCode,
      verificationCodeExpires,
      pendingEmail: newEmail,
    }
  );

  await SendEmail(
    newEmail,
    `<div>Your verification code for email change is: <b>${verificationCode}</b>. It expires in 10 minutes.</div>`
  );

  return null;
};

const verifyEmailChange = async (user: JwtPayload, code: string) => {
  const isUserExists = await UserModel.findOne({ email: user.email });

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (
    isUserExists.verificationCode !== code ||
    !isUserExists.verificationCodeExpires ||
    isUserExists.verificationCodeExpires < new Date()
  ) {
    throw new AppError(status.BAD_REQUEST, "Invalid or expired verification code");
  }

  const newEmail = isUserExists.pendingEmail;
  if (!newEmail) {
    throw new AppError(status.BAD_REQUEST, "No pending email change request");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await UserModel.findOneAndUpdate(
      { email: user.email },
      {
        email: newEmail,
        verificationCode: null,
        verificationCodeExpires: null,
        pendingEmail: null,
      },
      { session }
    );

    if (user.role === "client") {
      await ClientModel.findOneAndUpdate(
        { email: user.email },
        { email: newEmail },
        { session }
      );
    } else if (user.role === "admin") {
      await AdminModel.findOneAndUpdate(
        { email: user.email },
        { email: newEmail },
        { session }
      );
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return null;
};

export const UserServices = { getMe, requestEmailChange, verifyEmailChange };
