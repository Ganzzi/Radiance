import express from "express";

import {
  getMessageRooms,
  createMessage,
} from "../controllers/messageController.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

/* READ */
router.get("/:userId/messageRooms", verifyToken, getMessageRooms);

/* CREATE */
router.post("/:userId/:otherId/createMessage", verifyToken, createMessage);

export default router;
