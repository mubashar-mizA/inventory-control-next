import { NextResponse } from "next/server";
import { CONNECT_DB } from "@/app/configs/db_config";
import { userModel } from "@/app/models/user_model";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({
        status: 403,
        success: false,
        message: "Please provide all fields",
      });
    }

    CONNECT_DB();

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    console.log("Saved user ====>", savedUser);

    return NextResponse.json({
      success: true,
      status: 201,
      message: "User registered successfully!",
      newUserInDB: savedUser,
    });
  } catch (error) {
    console.log("Error in backend API of auth =====>", error);

    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
