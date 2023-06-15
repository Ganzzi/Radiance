import express from "express";
import {
  createPicture,
  reactPicture,
  updatePictureDescription,
  commentPicture,
  deletePicture,
} from "../controllers/pictureController.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();
/* CREATE */
router.post("/", verifyToken, createPicture);

/* UPDATE */
router.patch("/:pictureID/react", verifyToken, reactPicture);
router.patch(
  "/:pictureID/editDescribtion",
  verifyToken,
  updatePictureDescription
);
router.patch("/:pictureID/commentPicture", verifyToken, commentPicture);

/* DELETE */
router.delete("/:pictureID/remove", verifyToken, deletePicture);

export default router;
