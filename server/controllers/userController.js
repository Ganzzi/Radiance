import User from "../models/User.js";
import Picture from "../models/Picture.js";
import Message from "../models/Message.js";
import { v2 as cloudinary } from "cloudinary";

/* READ */
export const getUserSearchResult = async (req, res) => {
  const { searchRequest } = req.body;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: searchRequest, $options: "i" } },
        { phoneNumber: { $regex: searchRequest, $options: "i" } },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    // find all user's friend with ids
    const friends = await Promise.all(
      user.friendIds.map((_id) => User.findById(_id))
    );

    // format user's friend
    const formattedFriends = friends.map(
      ({ _id, username, userPicture, currentLocation }) => {
        return {
          _id,
          username,
          userPicture,
          currentLocation,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    // find all user's friend with ids
    const friends = await Promise.all(
      user.friendRequestorIds.map((_id) => User.findById(_id))
    );

    // format user's friend
    const formattedFriends = friends.map(({ _id, username, userPicture }) => {
      return _id
        ? {
            _id,
            username,
            userPicture,
          }
        : {};
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const getRequestSents = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    // find all user's friend with ids
    const friends = await Promise.all(
      user.friendRequestingIds.map((_id) => User.findById(_id))
    );

    // format user's friend
    const formattedFriends = friends.map(
      ({ username, userPicture, currentLocation, _id }) => {
        return {
          _id,
          username,
          userPicture:
            userPicture ||
            "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

/* CREATE */

export const sendOrCancelFriendRequest = async (req, res) => {
  const { userId, friendId } = req.params;
  const { type } = req.body;

  try {
    if (type == "add") {
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: { friendRequestingIds: friendId },
      });
      const other = await User.findByIdAndUpdate(friendId, {
        $addToSet: { friendRequestorIds: userId },
      });

      if (user && other) {
        res.status(200).json({ message: "Friend request sent successfully." });
      } else {
        res.status(404).json({ error: "Friend request sent failed." });
      }
    } else if (type === "cancel") {
      const user = await User.findByIdAndUpdate(userId, {
        $pull: { friendRequestingIds: friendId },
      });
      const other = await User.findByIdAndUpdate(friendId, {
        $pull: { friendRequestorIds: userId },
      });

      if (user && other) {
        res
          .status(200)
          .json({ message: "Friend request cancelled successfully." });
      } else {
        res.status(404).json({ error: "Friend request cancellation failed." });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending friend request." });
  }
};

export const acceptOrRemoveFriendRequest = async (req, res) => {
  const { userId, friendId } = req.params;
  const { type } = req.body;

  try {
    let message = "";

    if (type === "accept") {
      const user = await User.findByIdAndUpdate(userId, {
        $addToSet: { friendIds: friendId },
      });
      const other = await User.findByIdAndUpdate(friendId, {
        $addToSet: { friendIds: userId },
      });

      if (user !== null && other !== null) {
        message = "Friend request accepted successfully.";
      } else {
        message = "Friend request acceptance failed.";
      }
    }

    const user2 = await User.findByIdAndUpdate(userId, {
      $pull: { friendRequestorIds: friendId },
    });
    const other2 = await User.findByIdAndUpdate(friendId, {
      $pull: { friendRequestingIds: userId },
    });

    if (user2 !== null && other2 !== null) {
      if (type == "delete") {
        message = "Friend request deleted successfully.";
      }
      res.status(200).json({ message: message });
    } else {
      if (type == "delete") {
        message = "Friend request deletion failed.";
      }
      res.status(404).json({ error: message });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the friend request.",
    });
  }
};

/* UPDATE */

export const updateUserProfile = async (req, res) => {
  try {
    const { username, gender, bio, interests, photo, userPicture } = req.body;
    const userId = req.params.userId;

    let photoUrl = null;

    try {
      if (photo) {
        photoUrl = (await cloudinary.uploader.upload(photo)).url;
      }
    } catch (error) {
      console.log(error);
    }

    // Find the user by ID and update
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username,
          userPicture: photoUrl ? photoUrl : userPicture,
          gender,
          bio,
          interest: interests,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating account", error: error.message });
  }
};

export const updateLocation = async (req, res) => {
  const { userId } = req.params;
  const { currentLocation } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      currentLocation: currentLocation,
    });

    if (user) {
      res.status(200).json({ message: "Location updated" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the location.",
    });
  }
};

export const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { friendIds: friendId },
    });
    const other = await User.findByIdAndUpdate(friendId, {
      $pull: { friendIds: userId },
    });
    if (user !== null && other !== null) {
      res.status(200).json({ message: "Friend removed successfully." });
    } else {
      res.status(404).json({ error: "Friend removal failed." });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the friend request.",
    });
  }
};

export const blockOrUnblock = async (req, res) => {};

/* DELETE */

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Delete pictures with takerId equal to userId
    await Picture.deleteMany({ takerId: userId });

    // Delete messages with userId in users array
    await Message.deleteMany({ users: userId });

    const user = await User.findById(userId);

    if (!user) {
      // User not found
      return { success: false, message: "User not found." };
    }

    // Delete all related data
    const deletedRelationship = await Promise.all([
      // Delete friend requests sent by the user
      User.updateMany(
        { _id: { $in: user.friendRequestingIds } },
        { $pull: { friendRequestorIds: userId } }
      ),

      // Delete friend requests received by the user
      User.updateMany(
        { _id: { $in: user.friendRequestorIds } },
        { $pull: { friendRequestingIds: userId } }
      ),

      // Delete friendships
      User.updateMany(
        { _id: { $in: user.friendIds } },
        { $pull: { friendIds: userId } }
      ),
    ]);

    if (deletedRelationship) {
      // Delete the user
      await User.findByIdAndDelete(user._id);

      res.status(202).json({
        success: true,
        message: "User and related data deleted successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing user deleting.",
    });
  }
};
