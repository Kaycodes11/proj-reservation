import express from "express";
import * as HotelController from "../controllers/hotel.js";
import { verifyAdmin } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.post("/", verifyAdmin, HotelController.createHotel);

router.get("/", HotelController.getHotels);

router.get("/countByCity", HotelController.countByCity);

router.get("/countByType", HotelController.countByType);

router.put("/:id", verifyAdmin, HotelController.updateHotel);

router.delete("/:id", verifyAdmin, HotelController.deleteHotel);

router.get("/find/:id", HotelController.getHotelById);

router.get("/room/:id", HotelController.getHotelRooms);



export default router;
