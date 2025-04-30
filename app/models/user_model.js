import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  otp: { type: String }, // temporary OTP
  isVerified: { type: Boolean, default: false }, // user must verify OTP
});

export const userModel =
  mongoose.models.users || mongoose.model("users", userSchema);
