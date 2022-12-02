import { Schema, model } from "mongoose";

const RoomSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    roomNumbers: [{ number: Number, unavailableDates: [Date] }],
  },
  { timestamps: true }
);

// Room.findOne().byPrice(1000).exec((err, animal) => console.log(animal));
RoomSchema.query.byPrice = function (price) {
  return this.where({ price });
};

const Room = model("Room", RoomSchema);

export { Room };
