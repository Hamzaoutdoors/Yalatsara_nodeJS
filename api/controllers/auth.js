import asyncWrapper from "../middleware/async.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/custom-error.js";
import createTokenUser from "../utils/createTokenUser.js";
import { attachCookiesToResponse, createJWT } from "../utils/jwt.js";

export const register = async (req, res) => {
    const { email, username } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: `email: ${email} and username : ${username} already exist` });
        throw new CustomAPIError(`email: ${email} and username : ${username} already exist`, StatusCodes.BAD_REQUEST);
    };

    // first registered user is an admin

    const role = await User.countDocuments({}) === 0;
    const user = await User.create({ ...req.body, isAdmin: role });

    const tokenUser = createTokenUser(user);

    const token = createJWT({ payload: tokenUser });
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomAPIError('Please provide email and password', StatusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomAPIError('Invalide Credentials', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomAPIError('Invalide Credentials', StatusCodes.UNAUTHORIZED);
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });


    res.status(StatusCodes.OK).json({ user: {... tokenUser, email} })

};

export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });

    res.status(StatusCodes.OK).json({msg: 'user logged out!'})
}