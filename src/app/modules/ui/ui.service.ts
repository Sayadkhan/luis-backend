import { TUi } from "./ui.interface";
import { UiModel } from "./ui.model";

const createUiDataIntoDB = async (payload: TUi) => {
  const result = await UiModel.create(payload);
  return result;
};

const updateUiDataIntoDB = async (payload: TUi, id: string) => {
  const result = await UiModel.findOneAndUpdate({ _id: id }, payload);
  return result;
};
const getUiDataFromDB = async () => {
  const result = await UiModel.find();
  return result;
};

export const UiServices = {
  createUiDataIntoDB,
  updateUiDataIntoDB,
  getUiDataFromDB,
};
