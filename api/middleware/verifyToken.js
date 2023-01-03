import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { createCustomError } from "../errors/custom-error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

if (!token) {
        return next(createCustomError(`You are not authenticated!`, StatusCodes.FORBIDDEN))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {

            return next(createCustomError('Token is not valid!', StatusCodes.UNAUTHORIZED))
        }
        req.user = user;
        next();
    })
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createCustomError(`You are not authorized!`, StatusCodes.UNAUTHORIZED));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createCustomError(`You are not authorized!`, StatusCodes.UNAUTHORIZED));
        }
    });
};