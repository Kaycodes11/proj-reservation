import { User } from "../models/User.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(new ErrorMiddleware("User has not been found", 400));
    const hasThePasswordMatched = await user.comparePass(req.body.password);
    if (!hasThePasswordMatched) {
      return next(new ErrorMiddleware("Wrong username or password", 400));
    }

    // crypto.randomBytes(64).toString('hex');

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};
