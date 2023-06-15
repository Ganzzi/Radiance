const signup_request = {
  success: true,
  message: 'User created successfully!',
  user: {
    id: '123',
    name: 'John Doe',
    email: 'johndoe@example.com',
  },
};

export const login_request = {
  success: true,
  message: 'Login successful!',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  user: {
    _id: 'userId',
    username: 'JaneDoe',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
    email: 'janedoe@example.com',
    gender: 'non-binary',
    currentLocation: {
      longitude: -122.4194,
      latitude: 37.7749,
    },
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Donec ornare magna eu mauris tristique, ut efficitur eros commodo. Sed non venenatis eros.',
    interest: ['books', 'travel', 'sex', 'books', 'travel', 'sex'],
    // image: "https://example.com/janedoe-profile.png",
    phoneNumber: '9876543210',
    blocking: {},
    blocker: ['blockerId1'],
    messageRoomId: ['room1'],
    friendRequestorIds: ['friendRequestorId1', 'friendRequestorId2'],
    friendRequestingIds: ['friendRequestingId1'],
    friendIds: ['friendId1'],
    createdAt: '2022-03-03T18:25:41.223Z',
    updatedAt: '2022-03-03T19:05:10.109Z',
  },
};

const update_request = {
  success: true,
  message: 'Account updated successfully!',
  user: {
    id: '123',
    name: 'John Doe',
    email: 'johndoe@example.com',
  },
};

const createPicture_res = {
  _id: '606a2e2c8a43d3789e1c7f1a',
  pictureUrl: 'https://example.com/image.jpg',
  userPictureUrl: 'https://example.com/user-image.jpg',
  description: 'Example picture',
  location: {
    longitude: -122.4194,
    latitude: 37.7749,
  },
  takerId: '123abc',
  reactions: {},
  comments: [],
  createdAt: '2021-04-04T20:20:12.000Z',
  updatedAt: '2021-04-04T20:20:12.000Z',
};

const commentPicture = {
  comments: [
    {
      _id: '606a2e2c8a43d3789e1c7f1b',
      text: 'Great picture!',
      commenterId: '456def',
      createdAt: '2021-04-04T20:22:12.000Z',
      updatedAt: '2021-04-04T20:22:12.000Z',
    },
  ],
};

const reactPicture = {
  12232321: {
    icon: 'like',
    createdAt: '2021-04-04T20:25:12.000Z',
    updatedAt: '2021-04-04T20:25:12.000Z',
  },
};

const updatePictureDescribtion = {
  description: 'New description',
};

export const getUserFriends = [
  {
    _id: 'userId',
    username: 'fakeFriend1',
    email: 'fakefriend1@example.com',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
    currentLocation: {
      longitude: -122.4194,
      latitude: 37.7749,
    },
  },
  {
    _id: 'userId',
    username: 'fakeFriend1',
    email: 'fakefriend1@example.com',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
    currentLocation: {
      longitude: -122.4194,
      latitude: 37.7749,
    },
  },
  {
    _id: 'userId',
    username: 'fakeFriend1',
    email: 'fakefriend1@example.com',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
    currentLocation: {
      longitude: -122.4194,
      latitude: 37.7749,
    },
  },
];

export const getOtherUser = [
  {
    _id: 'userId',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
  {
    _id: 'userId',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
  {
    _id: 'userId',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
];

export const sendFriendRequest = [
  {
    _id: '1234',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
  {
    _id: '51213',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
  {
    _id: '1232131',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
];

export const acceptFriendRequest = [
  {
    _id: '123214',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
  {
    _id: '2132131',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
  {
    _id: '12321312',
    username: 'fakeFriend1',
    userPicture:
      'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
  },
];

const removeFriend = [
  {
    username: 'fakeFriend1',
    email: 'fakefriend1@example.com',
    userPicture: 'https://example.com/fakefriend1.jpg',
  },
  {
    username: 'fakeFriend2',
    email: 'fakefriend2@example.com',
    userPicture: 'https://example.com/fakefriend2.jpg',
  },
];

const blockOrUnblock = {
  blocking: {
    12324: true,
  },
  blocker: ['214214', '1232312'],
};

const edit = {
  message: 'User details updated successfully',
  updatedUser: {
    _id: 'userId',
    username: 'JaneDoe',
    userPicture: 'https://example.com/janedoe.png',
    email: 'janedoe@example.com',
    gender: 'non-binary',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Donec ornare magna eu mauris tristique, ut efficitur eros commodo. Sed non venenatis eros.',
    interest: ['books', 'travel'],
    image: 'https://example.com/janedoe-profile.png',
    phoneNumber: '9876543210',
    blocking: {},
    blocker: ['blockerId1'],
    messageRoomId: ['room1'],
    friendRequestorIds: ['friendRequestorId1', 'friendRequestorId2'],
    friendRequestingIds: ['friendRequestingId1'],
    friendIds: ['friendId1'],
    createdAt: '2022-03-03T18:25:41.223Z',
    updatedAt: '2022-03-03T19:05:10.109Z',
  },
};

export const getMessageRooms = [
  {
    users: [
      {
        _id: '123',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {
        senderId: '213315152135215',
        text: 'The main change in the refactored code is that we have separated out the logic of checking whether the senders are different into a separate variable called isDifferentSender. This improves the readability of the code and makes it easier to understand what',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '134',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '99',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '98',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '123',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '134',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '99',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '98',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '123',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '134',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '99',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '98',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '123',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '134',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '99',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
  {
    users: [
      {
        _id: '98',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
      {
        _id: '321',
        username: 'fakeFriend1',
        userPicture:
          'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/316114201_1214708365782346_3153077863591398082_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6AEB2VZWpzYAX8UOZRO&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBNNSKtqC4UHA4XpWQ8eRbqW67UaWO4QPtJ2XPhcH_hHw&oe=64646DA0',
      },
    ],
    messages: [
      {senderId: '12323213213', text: 'Hi Bob!', picture: '', createdAt: ''},
      {
        senderId: '213315152135215',
        text: 'Hey Alice!',
        picture: '',
        createdAt: '',
      },
    ],
  },
];
