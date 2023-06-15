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
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    phoneNumber: "+11010001342",
    username: "user1",
    userPicture: "",
    password: "password1",
    gender: "male",
    currentLocation: {
      longitude: 1.2345,
      latitude: 2.3456,
    },
    bio: "I am user 1",
    interest: ["sports", "music"],
    blocking: [],
    blocker: [userIds[1]],
    messageRoomId: ["room1", "room2"],
    friendRequestorIds: [userIds[2]],
    friendRequestingIds: [userIds[3]],
    friendIds: [userIds[4]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[1],
    phoneNumber: "+11010001343",
    username: "user2",
    userPicture: "",
    password: "password2",
    gender: "female",
    currentLocation: {
      longitude: 3.4567,
      latitude: 4.5678,
    },
    bio: "I am user 2",
    interest: ["movies", "travel"],
    blocking: [userIds[0]],
    blocker: [],
    messageRoomId: ["room1", "room2"],
    friendRequestorIds: [],
    friendRequestingIds: [userIds[3]],
    friendIds: [userIds[2]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[2],
    phoneNumber: "+11010001345",
    username: "user3",
    userPicture: "user3.jpg",
    password: "password3",
    gender: "others",
    currentLocation: {
      longitude: 5.6789,
      latitude: 6.789,
    },
    bio: "I am user 3",
    interest: ["food", "books"],
    blocking: [],
    blocker: [],
    messageRoomId: [messageRoomIds[1]],
    friendRequestorIds: [],
    friendRequestingIds: [],
    friendIds: [userIds[1]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[3],
    phoneNumber: "+840838897296",
    username: "test123",
    userPicture:
      "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
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
    messageRoomId: [messageRoomIds[0], messageRoomIds[1]],
    friendRequestorIds: [userIds[1]],
    friendRequestingIds: [userIds[3]],
    friendIds: [userIds[4]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: userIds[4],
    phoneNumber: "+840838897296",
    username: "test123",
    userPicture:
      "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
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
    messageRoomId: [messageRoomIds[0]],
    friendRequestorIds: [userIds[2]],
    friendRequestingIds: [userIds[1]],
    friendIds: [userIds[3]],
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
];

const comments = [
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Great picture!",
    commenterId: userIds[1],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Beautiful location!",
    commenterId: userIds[2],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Amazing shot!",
    commenterId: userIds[3],
  },
];

export const pictures = [
  {
    _id: new mongoose.Types.ObjectId(),
    pictureUrl:
      "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
    takerId: userIds[3],
    description: "This is an awesome picture",
    location: {
      longitude: 1.2345,
      latitude: 2.3456,
    },
    reactions: new Map([
      [
        userIds[1],
        {
          type: "like",
          createdAt: new Date(),
        },
      ],
      [
        userIds[3],
        {
          type: "like",
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
    takerId: userIds[3],
    description: "Beautiful sunset",
    location: {
      longitude: 3.4567,
      latitude: 4.5678,
    },
    reactions: new Map([
      [
        userIds[0],
        {
          type: "like",
          createdAt: new Date(),
        },
      ],
      [
        userIds[2],
        {
          type: "like",
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
    senderId: userIds[3],
    picture:
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P3a_438x447.jpg.img.jpg",
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "I am doing great!",
    senderId: userIds[4],
    picture:
      "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Let's meet up tomorrow.",
    senderId: userIds[3],
    picture:
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P3a_438x447.jpg.img.jpg",
    createdAt: 1115211422,
    updatedAt: 1115211422,
  },
];

export const messageRooms = [
  {
    _id: messageRoomIds[0],
    users: [userIds[3], userIds[4]],
    messages: [messages[0], messages[1]],
  },
  {
    _id: messageRoomIds[1],
    users: [userIds[3], userIds[2]],
    messages: [messages[2]],
  },
];
