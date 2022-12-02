import { ErrorMiddleware } from "../middleware/error.middleware.js";
import { Hotel } from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      // stop executing further code via "return" & send to the next middleware i.e. "error handler"
      return next(new ErrorMiddleware("You have entered invalid hotel", 400));
    }
    const updateHotelById = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotelById);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel)
      return next(new ErrorMiddleware("You have entered invalid hotel"));

    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The request hotel has been deleted" });
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const getHotelById = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(new ErrorMiddleware("No such hotel found", 400));
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    // just use "next" to send to the "error handler" (with the required values using ErrorMiddleware)
    return next(new ErrorMiddleware(error.message, error.status));
  }
};
