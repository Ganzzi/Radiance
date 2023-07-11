import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

import twilio from "twilio";
import readline from "readline";

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = "AC70db3699d97382e444da717cbf754add";
const verifySid = "VAbd14c326ee429301e93c4239385ace8d";

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
        "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
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

export const logIn = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

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

    // if (phoneNumber == "+840919405046") {
    //   // return res
    //   //   .status(200)
    //   //   .json({ message: "user not exist", phone: phoneNumber });

    //   return res
    //     .status(200)
    //     .json({ message: "user exist", phone: phoneNumber });
    // }

    const client = twilio(accountSid, authToken);

    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: "sms" })
      .then((verification) => {
        console.log(verification.status);
        if (verification.status == "pending") {
          return res.status(200).json({ message: "Verifying code sent!" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    const client = twilio(accountSid, authToken);

    client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: code })
      .then(async (verification_check) => {
        if (verification_check.status == "approved") {
          // Find the user with the provided username
          const user = await User.findOne({ phoneNumber });

          if (!user) {
            return res.json({ message: "user not exist", phone: phoneNumber });
          }

          return res
            .status(200)
            .json({ message: "user exist", phone: user.phoneNumber });
        }
      })
      .catch((err) => {
        return res.status(400).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
