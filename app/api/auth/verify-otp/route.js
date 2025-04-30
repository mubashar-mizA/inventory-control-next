import { NextResponse } from "next/server";
import { userModel } from "@/app/models/user_model";
import { CONNECT_DB } from "@/app/configs/db_config";

export async function POST(req) {
  CONNECT_DB();
  try {
    const { email, otp } = await req.json();

    const user = await userModel.findOne({ email });

    if (!user || user.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.otp = undefined; // clear OTP after verification
    await user.save();

    return NextResponse.json({ success: true, message: "Account verified" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
