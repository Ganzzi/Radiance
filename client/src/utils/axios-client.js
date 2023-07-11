import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

import { BASE_URL_ANDROID, BASE_URL } from "../constants";

const url = Platform.OS == "android" ? BASE_URL_ANDROID : BASE_URL;

const axiosClient = axios.create({
  baseURL: url,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  config.params = {
    ...config.params,
    _t: Date.now(), // Add timestamp query parameter to bypass cache
  };
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

export const clearAxiosCache = () => {
  axiosClient.defaults.headers.common["Cache-Control"] = "no-cache";
  axiosClient.defaults.headers.common["Pragma"] = "no-cache";
};

export default axiosClient;
