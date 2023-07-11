import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "picture", "emoji"],
      default: "text",
      required: true,
    },
    content: {
      pictureUrl: String,
      text: {
        type: String,
        required: true,
      },
    },
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
