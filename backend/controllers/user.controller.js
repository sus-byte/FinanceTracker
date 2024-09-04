import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token.utils.js";

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new apiError(400, `User with email '${email}' already exists!`);
    }
    let newUser = await User.create({
        username,
        email,
        password
    });
    createToken(res, newUser._id);
    res.send({
        message: 'User registered successfully',
        user: {
            username: newUser.username,
            email: newUser.email
        }
    })
});


const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new apiError(400, `${email} is not registered!`);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        createToken(res, user._id);
        res.send({
            message: 'Login success',
            user: {
                username: user.username,
                email: user.email
            }
        })
    } else {
        throw new apiError(400, 'Invalid password!');
    }
});


const logout = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.send({ message: 'Logout success' });
});


const updateProfile = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user._id);
    if (!user) throw new apiError(404, 'User not found!');
    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    if (req.body.password) {
        user.password = req.body.password || user.password;
    }
    let updatedUser = await user.save();
    res.send({
        message: 'User updated',
        user: {
            username: updatedUser.username,
            email: updatedUser.email,
        }
    })
})

export {signup, signin, logout, updateProfile}