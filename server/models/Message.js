import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    picture: String,
  },
  { timestamps: true }
);

const messageRoomSchema = new mongoose.Schema({
  users: {
    type: [String],
    required: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
});

const RadianceMessageRoom = mongoose.model(
  "RadianceMessageRoom",
  messageRoomSchema
);

export default RadianceMessageRoom;
