import User from "../models/User.js";
import Picture from "../models/Picture.js";
import Message from "../models/Message.js";
import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "dmb3vegiw",
//   api_key: "668977139884315",
//   api_secret: "vZQijAc4jYkGsQfsJlnar5bjv0Y",
//   secure: true,
// });

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
          userPicture:
            userPicture ||
            "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
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
      return {
        _id,
        username,
        userPicture:
          userPicture ||
          "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
      };
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

export const getUserPictures = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    const meAndMyFriends = [...user.friendIds, userId];

    const picturesPromises = meAndMyFriends.map((_id) =>
      Picture.find({ takerId: _id })
    );

    const picturesResults = await Promise.allSettled(picturesPromises);

    const pictures = picturesResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value)
      .flat();

    // format user's friend
    const formattedPictures = await Promise.all(
      pictures.map(async (pic) => {
        const taker = await User.findById(pic.takerId);

        return {
          location: pic.location,
          reactions: pic.reactions,
          _id: pic._id,
          pictureUrl: pic.pictureUrl,
          takerId: pic.takerId,
          createdAt: pic.createdAt,
          updatedAt: pic.updatedAt,
          comments: pic.comments,
          takerName: taker.username,
          takerPicture:
            taker.userPicture ||
            "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
        };
      })
    );

    res.status(200).json({ pictures: formattedPictures });
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const getMessageRooms = async (req, res) => {
  try {
    const userId = req.params.userId;

    // const user = await User.findById(userId);

    const messages = await Message.find({ users: userId });

    const formattedMessageRooms = await Promise.all(
      messages.map(async (room) => {
        const updatedUsers = await Promise.all(
          room.users.map(async (_id) => {
            if (_id !== userId) {
              const theOther = await User.findById(_id);
              return {
                _id: theOther._id,
                username: theOther.username,
                userPicture: theOther.userPicture,
              };
            } else {
              return null;
            }
          })
        );

        // Filter out null values from the updatedUsers array
        const filteredUsers = updatedUsers.filter((user) => user !== null);

        return {
          _id: room._id,
          users: filteredUsers,
          messages: room.messages,
        };
      })
    );
    // console.log(formattedMessageRooms);
    res.status(200).json(formattedMessageRooms);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

/* CREATE */

export const sendOrCancelFriendRequest = async (req, res) => {
  const { userId, friendId } = req.params;
  const { type } = req.body;

  console.log(type);

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
      console.log(message);
      res.status(200).json({ message: message });
    } else {
      if (type == "delete") {
        message = "Friend request deletion failed.";
      }
      console.log(message);
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
      photoUrl = (await cloudinary.uploader.upload(photo)).url;
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

export const updateLocation = async (req, res) => {};

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

export const deleteUser = async (req, res) => {};
