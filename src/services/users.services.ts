import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  CreateOptions,
} from "mongoose";
import User, { IUserDocument } from "../models/users.model";

export const findUsers = async (
  filter: FilterQuery<IUserDocument>,
  project?: ProjectionType<IUserDocument>,
  options?: QueryOptions<IUserDocument>
) => {
  return await User.find(filter, project, options);
};

export const findOneUser = async (
  filter: FilterQuery<IUserDocument>,
  project?: ProjectionType<IUserDocument>,
  options?: QueryOptions<IUserDocument>
) => {
  return await User.findOne(filter, project, options);
};

export const createUser = async (
  user: (IUserDocument | Partial<IUserDocument>)[],
  options?: CreateOptions
) => {
  return await User.create(user, options);
};
