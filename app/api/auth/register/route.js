import { NextResponse } from "next/server";
import { userModel } from "@/app/models/user_model";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { CONNECT_DB } from "@/app/configs/db_config";

export async function POST(req) {
  CONNECT_DB();
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Create unverified user with OTP
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      otp,
      isVerified: false,
    });

    await newUser.save();

    // Send OTP Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL_USER,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your <b>OTP</b> is ${otp}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "OTP sent", email });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
