import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { createCustomError, CustomAPIError } from "../errors/custom-error.js";
import { isTokenValid } from '../utils/jwt.js';

export const verifyToken = (req, res, next) => {
  //const token = req.cookies.token;
  const token = req.headers.authorization;

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

export const authenticateUser = async (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.headers.authorization;

  if (!token) {
    return next(createCustomError(`You are not authorized!`, StatusCodes.UNAUTHORIZED));
  }

  try {
    const { username, userId, isAdmin } = isTokenValid({ token });
    req.user = { username, userId, isAdmin };
    next();
  } catch (error) {
    throw new CustomAPIError.UnauthenticatedError('Authentication Invalid');
  }
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
