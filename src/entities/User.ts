import { Schema, model } from "mongoose";

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const User = model<IUser>("User", userSchema);

export { IUser, User };
