import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
});
export const userModel =
  mongoose.models.users || mongoose.model("users", userSchema);
