import bcrypt from "bcrypt";
import ApiResponse from "../helper/ApiResponse";
import asyncHandler from "../helper/asyncHandler";
import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: any = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Please Provide all the required fields")
        );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User already exists with this email"));
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Password must be at least 6 characters")
        );
    }

    const newUser = await User.create({
      name: name as string,
      email: email as string,
      password: password as string,
    });

    if (!newUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User not created successfully"));
    }

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          username: name,
          message: "User Created Successfully 🚀",
          user: password,
        },
        "User Created Successfully"
      )
    );
  }
);

const signIN = asyncHandler(({ req, res }: any) => {
  return res.status(200).json(new ApiResponse(200, "User  Signed In Done"));
});

export { registerUser, signIN };
