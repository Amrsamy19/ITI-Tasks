import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
  },
  { versionKey: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
