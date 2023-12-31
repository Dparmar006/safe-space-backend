import { IUser } from "../types";
import mongoose, { Document, Schema } from "mongoose";

export type IUserDocument = IUser & Document;

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: { type: String },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    image: { type: String },
    isOnline: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model<IUserDocument>("User", UserSchema);

export default User;
