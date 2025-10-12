import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const User = mongoose.model("User", userSchema);
export default User;
