import Picture from "../models/Picture.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

/* READ */

export const getUserPictures = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    const meAndMyFriends =
      user.friendIds.length !== 0 ? [...user.friendIds, userId] : [userId];

    const picturesPromises = meAndMyFriends.map((_id) =>
      Picture.find({ takerId: _id })
    );

    const picturesResults = await Promise.allSettled(picturesPromises);

    const pictures = picturesResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value)
      .flat();

    if (!pictures) {
      res.status(403).json({ message: "There are no pictures!" });
    }

    // Sort the pictures based on their createdAt property in descending order
    const sortedPictures = pictures.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );

    // Format user's friend
    const formattedPictures = await Promise.all(
      sortedPictures.map(async (pic) => {
        const taker = await User.findById(pic.takerId);

        return {
          location: pic.location,
          reactions: pic.reactions,
          _id: pic._id,
          pictureUrl: pic.pictureUrl,
          takerId: pic.takerId,
          description: pic.description,
          createdAt: pic.createdAt,
          updatedAt: pic.updatedAt,
          comments: pic.comments,
          takerName: taker.username,
          takerPicture: taker.userPicture,
        };
      })
    );

    res.status(200).json({ pictures: formattedPictures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPictureComments = async (req, res) => {
  const { pictureId } = req.params;

  try {
    const picture = await Picture.findById(pictureId);
    if (!picture) {
      return res.status(404).json({ error: "Picture not found" });
    }

    const comments = await Promise.all(
      picture.comments.map(async (comment) => {
        const commentor = await User.findById(comment.commenterId);
        return {
          _id: comment._id,
          commenterId: comment.commenterId,
          createdAt: comment.createdAt,
          text: comment.text,
          updatedAt: comment.updatedAt,
          commentorImage: commentor.userPicture,
          commentorName: commentor.username,
        };
      })
    );

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPictureReactions = async (req, res) => {
  const { pictureId } = req.params;

  try {
    const picture = await Picture.findById(pictureId);
    if (!picture) {
      return res.status(404).json({ error: "Picture not found" });
    }

    const reactions = [];
    for (const [userId, reaction] of picture.reactions.entries()) {
      const user = await User.findById(userId);
      if (user) {
        const reactionWithUser = {
          type: reaction.type,
          createdAt: reaction.createdAt,
          userId: user._id,
          userName: user.username,
          userImage: user.userPicture,
        };
        reactions.push(reactionWithUser);
      }
    }

    res.status(200).json({ reactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* CREATE */
export const createPicture = async (req, res) => {
  const { takerId, location, photo, description } = req.body;

  let photoUrl = null;

  try {
    photoUrl = (await cloudinary.uploader.upload(photo)).url;
  } catch (error) {
    console.log(error);
  }

  const picture = new Picture({
    takerId: takerId,
    location: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    pictureUrl: photoUrl,
    description: description,
  });

  await picture.save();

  const taker = await User.findById(takerId);

  const updatedPicture = {
    location: picture.location,
    reactions: picture.reactions,
    _id: picture._id,
    pictureUrl: picture.pictureUrl,
    takerId: picture.takerId,
    description: picture.description,
    createdAt: picture.createdAt,
    updatedAt: picture.updatedAt,
    comments: picture.comments,
    takerName: taker.username,
    takerPicture: taker.userPicture,
  };

  try {
    res.status(201).json({
      message: "Created Successfully",
      updatedPicture: updatedPicture,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save picture" });
  }
};

export const reactPicture = async (req, res) => {
  const { pictureId } = req.params;
  const { type, reactor } = req.body;

  try {
    const picture = await Picture.findById(pictureId);
    if (!picture) {
      return res.status(404).json({ error: "Picture not found" });
    }

    // Remove existing reaction (if any)
    picture.reactions.delete(reactor);

    // Add new reaction
    const newReaction = {
      type: type,
      createdAt: new Date(),
    };
    picture.reactions.set(reactor, newReaction);

    await picture.save();

    const user = await User.findById(reactor);
    const reaction = {
      ...newReaction,
      userId: user._id,
      userName: user.username,
      userImage: user.userPicture,
    };
    res.status(201).json({
      message: "Reaction created or updated",
      newReaction: reaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const commentPicture = async (req, res) => {
  const { pictureId } = req.params;
  const { text, commenterId } = req.body;

  try {
    const picture = await Picture.findById(pictureId);
    if (!picture) {
      return res.status(404).json({ error: "Picture not found" });
    }

    const newComment = {
      text: text,
      commenterId: commenterId,
    };

    picture.comments.push(newComment);
    const savedPicture = await picture.save();

    const commentor = await User.findById(commenterId);

    const savedCommentIndex = savedPicture.comments.length - 1;

    const formattedComment = {
      _id: savedPicture.comments[savedCommentIndex]._id,
      commenterId: savedPicture.comments[savedCommentIndex].commenterId,
      createdAt: savedPicture.comments[savedCommentIndex].createdAt,
      text: savedPicture.comments[savedCommentIndex].text,
      updatedAt: savedPicture.comments[savedCommentIndex].updatedAt,
      commentorImage: commentor.userPicture,
      commentorName: commentor.username,
    };

    res
      .status(201)
      .json({ message: "Comment created", comment: formattedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* UPDATE */
export const updatePictureDescription = async (req, res) => {
  const { pictureId } = req.params;
  const { description } = req.body;

  try {
    const picture = await Picture.findByIdAndUpdate(
      pictureId,
      { description: description },
      { new: true }
    );

    const taker = await User.findById(picture.takerId);

    const updatedPicture = {
      location: picture.location,
      reactions: picture.reactions,
      _id: picture._id,
      pictureUrl: picture.pictureUrl,
      takerId: picture.takerId,
      description: picture.description,
      createdAt: picture.createdAt,
      updatedAt: picture.updatedAt,
      comments: picture.comments,
      takerName: taker.username,
      takerPicture: taker.userPicture,
    };

    if (picture) {
      res
        .status(200)
        .json({ message: "Success", updatedPicture: updatedPicture });
    } else {
      res.status(404).json({ error: "Picture not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update picture description" });
  }
};

/* DELETE */
export const deletePicture = async (req, res) => {
  const { pictureId } = req.params;

  try {
    const deletedPicture = await Picture.findByIdAndRemove(pictureId);
    if (deletedPicture) {
      res.status(200).json({ message: "Picture deleted successfully" });
    } else {
      res.status(404).json({ error: "Picture not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the picture" });
  }
};
