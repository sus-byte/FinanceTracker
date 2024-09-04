import { asyncHandler } from "../middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";

export const createToken = asyncHandler(async (res, userId) => {
	let token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
	res.cookie("jwt", token, {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV != "development",
		maxAge: 3 * 24 * 60 * 60 * 1000
	});
});
