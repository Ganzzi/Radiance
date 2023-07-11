import { io } from "socket.io-client";
import { BASE_URL_ANDROID, BASE_URL } from "../constants";

const url = Platform.OS == "android" ? BASE_URL_ANDROID : BASE_URL;

const socket = io(url);

export default socket;
