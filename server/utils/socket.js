import { Server } from "socket.io";
import User from "../models/User.js";

export const connectSocket = (server) => {
  const io = new Server(server);

  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    // add message receiver to online user array

    socket.on("add-online-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    // Handle chat message for a specific user base on socket id
    socket.on("send-msg", (data) => {
      const senderSocket = onlineUsers.get(data.to);

      if (senderSocket) {
        // emit recieve message event to receiver's socket connection
        socket.to(senderSocket).emit("recieve-msg", {
          roomId: data.roomId,
          msg: data.msg,
          from: data.from,
        });
      }
    });

    // Handle picture reaction for a specific user base on socket id
    socket.on("react-picture", async (data) => {
      if (data.from != data.to) {
        const senderSocket = onlineUsers.get(data.to);

        if (senderSocket) {
          // emit recieve message event to receiver's socket connection
          socket.to(senderSocket).emit("recieve-reaction", {
            from: data.from,
            to: data.to,
            pictureId: data.pictureId,
            newReaction: data.newReaction,
          });
        }
      }

      const user = await User.findById(data.to);
      const friendIds = user.friendIds;

      // Iterate over the friend IDs
      friendIds.forEach((friendId) => {
        const senderSocket = onlineUsers.get(friendId);

        if (senderSocket) {
          // emit recieve message event to receiver's socket connection
          socket.to(senderSocket).emit("recieve-reaction", {
            from: data.from,
            to: data.to,
            pictureId: data.pictureId,
            newReaction: data.newReaction,
          });
        }
      });
    });

    socket.on("comment-picture", async (data) => {
      if (data.from != data.to) {
        const senderSocket = onlineUsers.get(data.to);

        if (senderSocket) {
          socket.to(senderSocket).emit("recieve-comment", {
            from: data.from,
            to: data.to,
            pictureId: data.pictureId,
            newComment: data.newComment,
          });
        }
      }

      const user = await User.findById(data.to);
      const friendIds = user.friendIds;

      // Iterate over the friend IDs
      friendIds.forEach((friendId) => {
        const senderSocket = onlineUsers.get(friendId);

        if (senderSocket) {
          socket.to(senderSocket).emit("recieve-comment", {
            from: data.from,
            to: data.to,
            pictureId: data.pictureId,
            newComment: data.newComment,
          });
        }
      });
    });

    socket.on("create-picture", async (updatedPicture) => {
      const user = await User.findById(updatedPicture.takerId);
      const friendIds = user.friendIds;

      // Iterate over the friend IDs
      friendIds.forEach((friendId) => {
        const senderSocket = onlineUsers.get(friendId);

        if (senderSocket) {
          socket.to(senderSocket).emit("recieve-new-picture", updatedPicture);
        }
      });
    });

    socket.on("update-picture", async (updatedPicture) => {
      const user = await User.findById(updatedPicture.takerId);
      const friendIds = user.friendIds;

      // Iterate over the friend IDs
      friendIds.forEach((friendId) => {
        const senderSocket = onlineUsers.get(friendId);

        if (senderSocket) {
          socket.to(senderSocket).emit("picture-updated", updatedPicture);
        }
      });
    });

    socket.on("delete-picture", async (data) => {
      const user = await User.findById(data.from);
      const friendIds = user.friendIds;

      console.log(friendIds);

      // Iterate over the friend IDs
      friendIds.forEach((friendId) => {
        const senderSocket = onlineUsers.get(friendId);

        if (senderSocket) {
          socket.to(senderSocket).emit("picture-deleted", data.pictureId);
          // console.log("emited....................................");
        }
      });
    });

    socket.on("add-cancel-request", (data) => {
      const receiverSocket = onlineUsers.get(data.to);

      if (receiverSocket) {
        socket.to(receiverSocket).emit("request-added-cancelled", data);
      }
    });

    socket.on("accept-delete-request", (data) => {
      const receiverSocket = onlineUsers.get(data.to);

      if (receiverSocket) {
        socket.to(receiverSocket).emit("request-accepted-deleted", data);
      }
    });

    socket.on("remove-friend", (data) => {
      const receiverSocket = onlineUsers.get(data.to);

      if (receiverSocket) {
        socket.to(receiverSocket).emit("friend-removed", data);
      }
    });

    socket.on("update-location", async (data) => {
      // find list of friends' id (type array)
      //  await User.findById(data.userId).friendIds;
      const user = await User.findById(data.userId);
      const friendIds = user.friendIds;

      // Iterate over the friend IDs
      friendIds.forEach((friendId) => {
        // Retrieve the friend's socket ID from the onlineUsers map
        const friendSocketId = onlineUsers.get(friendId);

        if (friendSocketId) {
          // Emit a location update event to the friend's socket connection
          io.to(friendSocketId).emit("location-update", {
            userId: data.userId,
            location: data.updatedLocation,
          });
        }
      });
    });
  });
};
