import { NextResponse } from "next/server";
import { CONNECT_DB } from "@/app/configs/db_config";
import { userModel } from "@/app/models/user_model";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide all fields" },
        { status: 403 }
      );
    }

    CONNECT_DB();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully!",
        newUserInDB: savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in backend API of auth =====>", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
