import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const BASE_URL = "http://192.168.1.9:1337/";
// const BASE_URL = "http://127.0.0.1:1337/";
const BASE_URL_ANDROID = "http://10.0.2.2:1337/";

const url = Platform.OS == "android" ? BASE_URL_ANDROID : BASE_URL;

console.log(url);

const axiosClient = axios.create({
  baseURL: url,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");
  // console.log("token: " + token);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    try {
      const { response } = err;
      if (response === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (error) {
      console.log(error);
    }

    throw err;
  }
);

export default axiosClient;
