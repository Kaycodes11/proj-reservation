import jwt from "jsonwebtoken";
import { ErrorMiddleware } from "../middleware/error.middleware.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // no token found whatsoever
  if (!token) return next(new ErrorMiddleware("No such user found", 401));

  jwt.verify(token, process.env.JWT, (err, user) => {
    // has token but token is wrong as verified
    if (err) return next(new ErrorMiddleware("Invalid token", 403));
    // now add the custom property i.e. user on req which value is the "verified user"
    req.user = user;
    // now send to the next middleware
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      // simply go to its exact next middleware
      return next();
    } else {
      // this goes to next error middleware / error handler
      return next(new ErrorMiddleware("You are not authorized", 403));
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(new ErrorMiddleware("You are not authorized", 403));
    }
  });
};
