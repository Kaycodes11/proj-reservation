import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// database init
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    throw error;
  }
};

// mongoose.connection.on("connected", () => {
//   console.log("mongodb connected");
// });

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

// global routes

// middleware
app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);

// as this error middleware is next to route middleware, so any routes used next() will come here
app.use((err, req, res, next) => {
  return res.status(err.status).json({ message: err.message });
});

const PORT = process.env.PORT;

// server init
app.listen(PORT, () => {
  connect();
  console.log(`server started on ${PORT}`);
});
