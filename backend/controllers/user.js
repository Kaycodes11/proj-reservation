import { User } from "../models/User.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return next(new ErrorMiddleware("Invalid user", 400));
    const updateUserById = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updateUserById);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return next(new ErrorMiddleware("Invalid user"));

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The requested user has been deleted" });
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorMiddleware("No such user found", 400));
    }
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.status(200).json(users);
  } catch (error) {
    return next(new ErrorMiddleware(error.message, error.status));
  }
};
