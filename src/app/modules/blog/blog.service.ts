import { IBlog } from "./blog.interface";
import blogModel from "./blog.model";

const createBlogIntoDB = async (payload: Partial<IBlog>) => {
  const result = await blogModel.create(payload);
  return result;
};

const getAllBlogsFromDB = async (status?: string) => {
  const filter = status ? { status } : {};
  const result = await blogModel
    .find(filter)
    .sort({ createdAt: -1 })
    .select("title slug shortDescription coverImage author category tags status publishedAt createdAt");
  return result;
};

const getBlogBySlugFromDB = async (slug: string) => {
  const result = await blogModel.findOne({ slug });
  return result;
};

const updateBlogInDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await blogModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await blogModel.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogBySlugFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
