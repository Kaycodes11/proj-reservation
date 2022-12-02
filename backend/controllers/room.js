import { ErrorMiddleware } from "../middleware/error.middleware.js";
import { Room } from "../models/Room.js";
import { Hotel } from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(
        hotelId,
        { $push: { rooms: savedRoom._id } },
        { new: true }
      );
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(new ErrorMiddleware("new room creation error"));
  }
};

export const updateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId);
    if (!room) return next(new ErrorMiddleware("Room unavailable", 400));

    const updateRoomById = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoomById);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndDelete(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ message: "The requested room has been deleted" });
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const getRoomById = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return next(new ErrorMiddleware("No such room found", 400));
    }
    res.status(200).json(room);
  } catch (error) {
    next(new ErrorMiddleware(error.message, error.status));
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    // just use "next" to send to the "error handler" (with the required values using ErrorMiddleware)
    return next(new ErrorMiddleware(error.message, error.status));
  }
};
