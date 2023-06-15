import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const {
      username,
      phoneNumber,
      gender,
      password,
      currentLocation,
      userPicture,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      phoneNumber,
      gender,
      password: passwordHash,
      currentLocation,
      userPicture:
        userPicture ||
        "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const x = {
  __v: 0,
  _id: "6478472d53abc58a96d9a0cb",
  bio: "I am user 123",
  blocker: ["6478363028834f4bdadc9975"],
  blocking: [],
  createdAt: "1970-01-13T21:46:51.422Z",
  currentLocation: {
    latitude: 10.829464724702163,
    longitude: 106.67271589689359,
  },
  friendIds: ["6478363028834f4bdadc9978"],
  friendRequestingIds: ["6478363028834f4bdadc9977"],
  friendRequestorIds: ["6478363028834f4bdadc9976"],
  gender: "male",
  interest: ["sports", "music"],
  messageRoomId: ["room1", "room2"],
  password: "$2b$10$SVA.qp1a5VV3V0mj7mloNOhmJc8qz7zgc7g8KLipCrShGo5UZbpDq",
  phoneNumber: "+840838897296",
  updatedAt: "1970-01-13T21:46:51.422Z",
  userPicture: "",
  username: "test123",
};

export const logIn = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    console.log(phoneNumber, password);

    // Find the user with the provided username
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      // return res.status(401).json({ message: "user not exist" });
      return res.json({ message: "user not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Invalid password." });
    // if (!isMatch) return res.status(400).json({ message: "Invalid password." });

    // Generate and return a token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // delete user.password;

    res.json({ message: "Login successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const checkPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Find the user with the provided username
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.json({ message: "user not exist", phone: phoneNumber });
    }

    res.status(200).json({ message: "user exist", phone: user.phoneNumber });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
