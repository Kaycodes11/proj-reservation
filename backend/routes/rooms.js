import express from "express";
import * as RoomController from "../controllers/room.js";
import { verifyAdmin } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.post("/:hotelId", verifyAdmin, RoomController.createRoom);

router.put("/availability/:id", RoomController.updateRoomAvailability);
router.put("/:id", verifyAdmin, RoomController.updateRoom);

router.delete("/:id/:hotelId", verifyAdmin, RoomController.deleteRoom);

router.get("/:id", RoomController.getRoomById);

router.get("/", RoomController.getRooms);

export default router;
