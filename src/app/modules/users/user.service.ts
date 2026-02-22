import { AdminModel } from "../admin/admin.model";
import { verifyToken } from "../auth/auth.utils";
import { ClientModel } from "../client/client.model";

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

export const UserServices = { getMe };
