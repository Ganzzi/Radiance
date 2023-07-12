import express from "express";

import {
  getUserPictures,
  createPicture,
  reactPicture,
  updatePictureDescription,
  commentPicture,
  deletePicture,
  getPictureComments,
  getPictureReactions,
} from "../controllers/pictureController.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

/* READ */
router.get("/:userId/pictures", verifyToken, getUserPictures);
router.get("/:pictureId/comments", verifyToken, getPictureComments);
router.get("/:pictureId/reactions", verifyToken, getPictureReactions);

/* CREATE */
router.post("/", verifyToken, createPicture);
router.post("/:pictureId/comments", verifyToken, commentPicture);
router.post("/:pictureId/reactions", verifyToken, reactPicture);

/* UPDATE */
router.patch(
  "/:pictureId/editDescribtion",
  verifyToken,
  updatePictureDescription
);

/* DELETE */
router.delete("/:pictureId/remove", verifyToken, deletePicture);

export default router;
