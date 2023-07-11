import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    commenterId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const pictureSchema = new mongoose.Schema(
  {
    pictureUrl: {
      type: String,
      required: true,
    },
    takerId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    reactions: {
      type: Map,
      of: {
        type: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
      default: {},
    },
    comments: [
      {
        type: commentSchema,
      },
    ],
  },
  { timestamps: true }
);

const RadiancePicture = mongoose.model("RadiancePicture", pictureSchema);

export default RadiancePicture;
