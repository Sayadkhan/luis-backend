import mongoose from "mongoose";
import { TUser } from "../users/user.interface";
import { TAdmin } from "./admin.interface";
import { UserModel } from "../users/user.model";
import { AppError } from "../../errors/AppError";
import status from "http-status";
import { AdminModel } from "./admin.model";

const createAdminIntoDB = async (payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.email = payload.email;
  userData.password = payload.password;
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create user");
    }

    payload.user = newUser[0]._id;

    const newAdmin = await AdminModel.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

export const AdminServices = { createAdminIntoDB };
