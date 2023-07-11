import User from "../models/User.js";
import Message from "../models/Message.js";

/* READ */
export const getMessageRooms = async (req, res) => {
  try {
    const userId = req.params.userId;

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
    res.status(200).json(formattedMessageRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE */
export const createMessage = async (req, res) => {
  const { userId, otherId } = req.params;
  const { type, content } = req.body;

  try {
    let found = true;
    // Check if the message room already exists
    let room = await Message.findOne({
      users: { $all: [userId, otherId] },
    });

    if (!room) {
      found = false;
      // If the room does not exist, create a new room
      room = new Message({
        users: [userId, otherId],
        messages: [],
      });
    }

    // Create a new message
    const newMessage = {
      senderId: userId,
      type: type,
      content: content,
    };

    // Add the new message to the room
    room.messages.push(newMessage);

    // Save the room
    await room.save();

    if (found) {
      res.status(201).json({
        message: "Message created",
        newMessage: room.messages[room.messages.length - 1],
      });
    } else {
      res.status(201).json({ message: "New room created", room: room });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
