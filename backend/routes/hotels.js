import express from "express";
import * as HotelController from "../controllers/hotel.js";
import { verifyAdmin } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.post("/", verifyAdmin, HotelController.createHotel);

router.put("/:id", verifyAdmin, HotelController.updateHotel);

router.delete("/:id", verifyAdmin, HotelController.deleteHotel);

router.get("/:id", HotelController.getHotelById);

router.get("/", HotelController.getHotels);

export default router;
