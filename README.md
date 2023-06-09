# Radiance

Radiance is a feature-rich mobile application that allows users to connect, share, and explore moments with friends and the community. The app provides various functionalities such as location tracking, capturing and sharing pictures, commenting and reacting to posts, adding friends, messaging, and replying to pictures. With Radiance, you can discover new places, express yourself through visual content, engage with others, and stay connected with friends in a dynamic and vibrant social network.
Demo video: https://youtu.be/e2kD6BVDAb4

## Key Features

1. Location Tracking: Radiance allows you to track and share your location with friends, making it easy to meet up, discover new places, and explore together.
2. Picture Capture and Sharing: Capture memorable moments with the built-in camera feature and instantly share them with your friends and followers. Express yourself through visually captivating pictures.
3. Commenting and Reacting: Engage in conversations and discussions by commenting on posts shared by friends or the community. Express your emotions and opinions by reacting to posts with a wide range of reactions.
4. Adding Friends: Connect with new friends by sending friend requests and expanding your social network. Stay connected with the people who matter most to you.
5. Messaging: Communicate with friends through private messaging. Share personal thoughts, make plans, and keep in touch with ease.
6. Replying to Pictures: Add depth to picture interactions by replying to specific pictures. Share your thoughts, insights, or experiences related to a particular picture.

## How to Get Started

1. Open link https://expo.dev/@ganzzi/radiance-app then scan QR or open relative link on your device (IOS not supported)
2. Sign up for an account or log in if you already have one.
   (If you want to test with another account, try this:

- Phone: (+84)0919405046
- Password: boiken123
  With that account, you don't need to receive SMS when login)

3. Grant necessary permissions for location tracking and camera access.
4. Explore the app's features, discover posts from friends and the community, and start sharing your own moments.
5. Connect with friends, add new friends, and engage in conversations through comments, reactions, and messaging.
6. Enjoy the vibrant social experience and make the most out of Radiance.

## Installation

To run the application locally, follow these steps:

1. Clone the repository to your local machine using: `git clone https://github.com/Ganzzi/Radiance.git`
2. Open new terminal in Radiance\server folder
3. ` npm install` AND `npm run start`
4. Rename .env.example to .env then change variables:

- MONGO_URL
- JWT_SECRET
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- TWILIO_AUTH_TOKEN

5. Open new terminal in Radiance\client folder
6. `npm install -g eas-cli`
7. `yarn`
8. `npm run start`
9. Now application is ready to run on Android Studio Emulator/iOS Simulator/Android device/IOS device
10. Note:
    - Firstly, remane .env.example to .env in client folder
    - If you use IOS, Android device (expo go), BASE_URL variable should be http://<EXPO_URL>:<SERVER_PORT>/ (<EXPO_URL> is <192.168.1.4> in "Metro waiting on exp://192.168.1.4:19000" at console. ex: BASE_URL=http://192.168.1.4:1337/)
    - If you use Android Studio Emulator, BASE_URL variable should be http://10.0.2.2:1337/

## Technologies Used

Radiance utilizes the following technologies:

1. Expo - React Native:
   Radiance is built using React Native, a popular framework for developing cross-platform mobile applications. It allows for efficient and seamless development for both iOS and Android platforms.

2. Tailwind CSS:
   Tailwind CSS is a utility-first CSS framework used in Radiance for responsive and customizable styling of user interface components. It provides a wide range of pre-built utility classes that make styling and layout design more convenient.

3. Google Maps API:
   The Google Maps API is integrated into Radiance to enable location tracking and mapping features. It allows users to track their location, explore nearby places, and visualize locations on maps within the app.

4. Twilio:
   Twilio is utilized in Radiance to provide SMS verification functionality for secure user authentication. It ensures that user accounts are protected and authenticated through a secure SMS verification process.

5. Cloudinary:
   Cloudinary is integrated into Radiance to efficiently store, retrieve, and manage images. It provides a cloud-based image management solution that allows users to upload, manipulate, and serve images seamlessly within the app.

6. ExpressJS:
   ExpressJS is a fast and minimalist web application framework used in the Radiance server-side implementation. It provides a robust set of features for building web applications and APIs, making it an ideal choice for handling backend functionality.

7. Mongoose:
   Mongoose is an object data modeling (ODM) library for MongoDB, used in Radiance to interact with the MongoDB database. It simplifies the process of defining data models, validating data, and performing database operations within the application.

8. Socket.IO:
   Socket.IO is a real-time communication library used in Radiance to enable bi-directional communication between the server and client. It facilitates instant messaging, notifications, and real-time updates, enhancing the interactive experience within the app.
