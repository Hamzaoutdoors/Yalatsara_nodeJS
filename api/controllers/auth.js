import asyncWrapper from "../middleware/async.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/custom-error.js";
import createTokenUser from "../utils/createTokenUser.js";
import { attachCookiesToResponse, createJWT } from "../utils/jwt.js";

export const register = asyncWrapper(async (req, res) => {
    const { email, username } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `email: ${email} and username : ${username} already exist` });
        throw new CustomAPIError(`email: ${email} and username : ${username} already exist`, StatusCodes.BAD_REQUEST);
    };

    // first registered user is an admin

    const admin = await User.countDocuments({}) === 0;
    const user = await User.create({ ...req.body, isAdmin: admin });

    const tokenUser = createTokenUser(user);

    const token = createJWT({ payload: tokenUser });
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}
);

export const login = asyncWrapper(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' })
        throw new CustomAPIError('Please provide email and password', StatusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalide Credentials' })
        throw new CustomAPIError('Invalide Credentials', StatusCodes.UNAUTHORIZED);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalide password' })
        throw new CustomAPIError('Invalide Credentials', StatusCodes.UNAUTHORIZED);
    }

    const tokenUser = createTokenUser(user);

    const token = createJWT({ payload: tokenUser });
    attachCookiesToResponse({ res, user: tokenUser });


    res.status(StatusCodes.OK).json({ user: tokenUser, token })

});

export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });

    res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}