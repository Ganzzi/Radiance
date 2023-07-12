import { io } from "socket.io-client";
import { BASE_URL_IOS_EXPO_GO, BASE_URL_ANDROID, BASE_URL } from "@env";

// const url = Platform.OS == "android" ? BASE_URL_ANDROID : BASE_URL_IOS_EXPO_GO;
const url = BASE_URL;

const socket = io(url);

export default socket;
