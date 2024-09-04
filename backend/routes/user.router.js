import express from "express";
import {
	logout,
	signin,
	signup,
	updateProfile,
} from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", logout);

router.put("/profile", checkAuth, updateProfile);

export default router;
