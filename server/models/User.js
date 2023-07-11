import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    userPicture: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
    currentLocation: {
      longitude: {
        type: Number,
      },
      latitude: {
        type: Number,
      },
    },
    bio: String,
    interest: [String],
    // blocking: {
    //   type: Array,
    //   default: [],
    // },
    // blocker: {
    //   type: Array,
    //   default: [],
    // },
    // messageRoomId: [String],
    friendRequestorIds: {
      type: Array,
      default: [],
    },
    friendRequestingIds: {
      type: Array,
      default: [],
    },
    friendIds: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const RadianceUser = mongoose.model("RadianceUser", userSchema);

export default RadianceUser;
