import { IPost } from "../types";
import mongoose, { Document, Schema } from "mongoose";

export type IPostDocument = IPost & Document;

const PostSchema: Schema = new Schema({
  content: { type: String, required: true },
  images: [{ type: String }],
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model<IPostDocument>("Post", PostSchema);

export default Post;
