import { FilterQuery, ProjectionType, QueryOptions } from "mongoose";
import Post, { IPostDocument } from "../models/posts.model";

export const findPosts = async (
  filter: FilterQuery<IPostDocument>,
  project?: ProjectionType<IPostDocument>,
  options?: QueryOptions<IPostDocument>
) => {
  return await Post.find(filter, project, options);
};
