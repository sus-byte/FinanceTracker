import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { asyncHandler } from "./asyncHandler.js";
import jwt from "jsonwebtoken";

export const checkAuth = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    if (!token) throw new apiError(400, 'You must be logged in!');
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const userDetails = await User.findById(userId).select("-password");
        req.user = userDetails;
        next();
    } catch (error) {
        throw new apiError(400, 'Invalid token!');
    }
})