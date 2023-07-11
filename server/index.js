import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pictureRoutes from "./routes/pictureRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import RadianceUser from "./models/User.js";
import RadiancePicture from "./models/Picture.js";
import RadianceMessageRoom from "./models/Message.js";
import { users, messageRooms, pictures } from "./data/index.js";
import { connectSocket } from "./utils/socket.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTE SETUP */
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/pictures", pictureRoutes);
app.use("/messages", messageRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    connectSocket(server);

    /* INSERT DATA INTO DATABASE */
    // RadianceUser.insertMany(users);
    // RadiancePicture.insertMany(pictures);
    // RadianceMessageRoom.insertMany(messageRooms);
  })
  .catch((error) => console.log(`${error} did not connect`));
