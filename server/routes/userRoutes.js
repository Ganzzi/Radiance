import express from "express";
import {
  getUser,
  getUserFriends,
  getUserPictures,
  getMessageRooms,
  sendOrCancelFriendRequest,
  acceptOrRemoveFriendRequest,
  updateUserProfile,
  updateLocation,
  blockOrUnblock,
  removeFriend,
  deleteUser,
  getFriendRequests,
  getRequestSents,
  getUserSearchResult,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getUser);
router.get("/:userId/pictures", verifyToken, getUserPictures);
router.get("/:userId/friends", verifyToken, getUserFriends);
router.get("/:userId/friendRequests", verifyToken, getFriendRequests);
router.get("/:userId/requestSents", verifyToken, getRequestSents);
router.get("/:userId/messageRooms", verifyToken, getMessageRooms);

/* CREATE */
router.post("/searchUser", verifyToken, getUserSearchResult);

/* UPDATE */
router.patch("/:userId/updateUserProfile", verifyToken, updateUserProfile);
router.patch(
  "/:userId/:friendId/sendOrCancelFriendRequest",
  verifyToken,
  sendOrCancelFriendRequest
);
router.patch(
  "/:userId/:friendId/acceptOrRemoveFriendRequest",
  verifyToken,
  acceptOrRemoveFriendRequest
);
router.patch("/:userId/:friendId/removeFriend", verifyToken, removeFriend);

router.patch("/:userId/updateLocation", verifyToken, updateLocation);
router.patch("/:userId/:otherId/blockOrUnblock", verifyToken, blockOrUnblock);

/* DELETE */
router.delete("/:userId/remove", verifyToken, deleteUser);

export default router;
