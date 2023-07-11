// This file include data to insert when develop application
import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const messageRoomIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0].toString(),
    phoneNumber: "+11010001342",
    username: "user1",
    userPicture:
      "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
    password: "$2b$10$SVA.qp1a5VV3V0mj7mloNOhmJc8qz7zgc7g8KLipCrShGo5UZbpDq",
    gender: "male",
    currentLocation: {
      longitude: 1.2345,
      latitude: 2.3456,
    },
    bio: "I am user 1",
    interest: ["sports", "music"],
    blocking: [],
    blocker: [userIds[1]].toString(),
    friendRequestorIds: [userIds[2]].toString(),
    friendRequestingIds: [userIds[3]].toString(),
    friendIds: [userIds[4]].toString(),
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[1].toString(),
    phoneNumber: "+11010001343",
    username: "user2",
    userPicture:
      "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
    password: "$2b$10$SVA.qp1a5VV3V0mj7mloNOhmJc8qz7zgc7g8KLipCrShGo5UZbpDq",
    gender: "female",
    currentLocation: {
      longitude: 3.4567,
      latitude: 4.5678,
    },
    bio: "I am user 2",
    interest: ["movies", "travel"],
    blocking: [userIds[0]].toString(),
    blocker: [],
    friendRequestorIds: [],
    friendRequestingIds: [userIds[3]].toString(),
    friendIds: [userIds[2]].toString(),
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[2].toString(),
    phoneNumber: "+11010001345",
    username: "user3",
    userPicture:
      "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
    password: "$2b$10$SVA.qp1a5VV3V0mj7mloNOhmJc8qz7zgc7g8KLipCrShGo5UZbpDq",
    gender: "others",
    currentLocation: {
      longitude: 5.6789,
      latitude: 6.789,
    },
    bio: "I am user 3",
    interest: ["food", "books"],
    blocking: [],
    blocker: [],
    friendRequestorIds: [],
    friendRequestingIds: [],
    friendIds: [userIds[1]].toString(),
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[3].toString(),
    phoneNumber: "+840838897296",
    username: "duy an",
    userPicture:
      "https://res.cloudinary.com/dmb3vegiw/image/upload/v1688365425/nwiyz8qemwgg6r2roa4x.jpg",
    password: "$2b$10$SVA.qp1a5VV3V0mj7mloNOhmJc8qz7zgc7g8KLipCrShGo5UZbpDq",
    gender: "male",
    currentLocation: {
      longitude: 106.67271589689359,
      latitude: 10.829464724702163,
    },
    bio: "I am user 123",
    interest: ["sports", "music"],
    blocking: [],
    blocker: [],
    friendRequestorIds: [userIds[1]].toString(),
    friendRequestingIds: [userIds[3]].toString(),
    friendIds: [userIds[4]].toString(),
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[4].toString(),
    phoneNumber: "+840919405046",
    username: "du nguyen",
    userPicture:
      "https://res.cloudinary.com/dmb3vegiw/image/upload/v1688365102/ijekke2kanethcwnp5yu.jpg",
    password: "$2b$10$SVA.qp1a5VV3V0mj7mloNOhmJc8qz7zgc7g8KLipCrShGo5UZbpDq",
    gender: "male",
    currentLocation: {
      longitude: 106.67271589689359,
      latitude: 10.829464724702163,
    },
    bio: "I am user 123",
    interest: ["sports", "music"],
    blocking: [],
    blocker: [],
    friendRequestorIds: [userIds[2]].toString(),
    friendRequestingIds: [userIds[1]].toString(),
    friendIds: [userIds[3]].toString(),
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
];

const comments = [
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Great picture!",
    commenterId: userIds[1].toString(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Beautiful location!",
    commenterId: userIds[2].toString(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Amazing shot!",
    commenterId: userIds[3].toString(),
  },
];

export const pictures = [
  {
    _id: new mongoose.Types.ObjectId(),
    pictureUrl:
      "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
    takerId: userIds[4].toString(),
    description: "This is an awesome picture",
    location: {
      longitude: 10.2345,
      latitude: 106.3456,
    },
    reactions: new Map([
      [
        userIds[1].toString(),
        {
          type: "emoticon-cool",
          createdAt: new Date(),
        },
      ],
      [
        userIds[3].toString(),
        {
          type: "emoticon-kiss",
          createdAt: new Date(),
        },
      ],
    ]),
    comments: [comments[0], comments[1]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    pictureUrl:
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P3a_438x447.jpg.img.jpg",
    takerId: userIds[3].toString(),
    description: "Beautiful sunset",
    location: {
      longitude: 10.4567,
      latitude: 106.5678,
    },
    reactions: new Map([
      [
        userIds[0].toString(),
        {
          type: "emoticon-cool",
          createdAt: new Date(),
        },
      ],
      [
        userIds[2].toString(),
        {
          type: "emoticon-poop",
          createdAt: new Date(),
        },
      ],
    ]),

    comments: [comments[2]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
];

const messages = [
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Hello, how are you?",
    senderId: userIds[3].toString(),
    type: "text",
    content: {
      text: "Hello, how are you?",
    },
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    type: "emoji",
    content: {
      text: "emoticon-angry",
    },
    senderId: userIds[4].toString(),
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    senderId: userIds[3].toString(),
    type: "picture",
    content: {
      text: "Fuck you!",
      pictureUrl:
        "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P3a_438x447.jpg.img.jpg",
    },
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    senderId: userIds[2].toString(),
    type: "text",
    content: {
      text: "Fuck you!",
    },
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
];

export const messageRooms = [
  {
    _id: messageRoomIds[0].toString(),
    users: [userIds[3].toString(), userIds[4]].toString(),
    messages: [messages[0], messages[1]],
  },
  {
    _id: messageRoomIds[1].toString(),
    users: [userIds[3].toString(), userIds[2]].toString(),
    messages: [messages[2], messages[3]],
  },
];
