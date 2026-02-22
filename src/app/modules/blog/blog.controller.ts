import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import AppError from "../../errors/AppError";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const { status } = req.query;
  const result = await BlogServices.getAllBlogsFromDB(status as string | undefined);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getBlogBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await BlogServices.getBlogBySlugFromDB(slug);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BlogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
