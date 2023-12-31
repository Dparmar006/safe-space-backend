import { ObjectId } from "mongoose";

export interface IPost {
  _id: ObjectId;
  content: string;
  images: string[]; // Assuming images are an array of strings (URLs or base64 encoded)
  authorId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
