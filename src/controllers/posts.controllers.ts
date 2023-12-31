import { Request, Response } from "express";
import { findPosts } from "../services/posts.services";
import { sendResponse } from "../utils/response.utils";

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await findPosts({});
  return sendResponse(res, 200, "", posts);
};
