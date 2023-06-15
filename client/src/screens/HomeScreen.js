import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Map, PictureList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { setLogin } from "../state";
import axiosClient from "../axios-client";

const HomeScreen = () => {
  const [showCard, setShowCard] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const width = Platform.OS == "ios" ? 414 : 412;
  const { user, token } = useSelector((state) => state.state);
  const [data, setData] = useState([]);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN");
        const userjson = await AsyncStorage.getItem("CURRENT_USER");
        const user = JSON.parse(userjson);

        if (token && user) {
          dispatch(setLogin({ token: token, user: user }));
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrieveUserData();
  }, []);

  useEffect(() => {
    const retrievePictures = async () => {
      try {
        if ((user, token)) {
          await axiosClient
            .get(`/user/${user._id}/pictures`)
            .then(({ data }) => {
              if (data?.pictures?.length > 0) {
                // console.log(data.pictures);
                // console.log("picture");
                setData(data.pictures);
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrievePictures();
  }, [token, user]);

  const [focusImageIndex, setFocusImageIndex] = useState(0);
  const [isUserLocation, setIsUserLocation] = useState(true);
  const [isPictureLocation, setIsPictureLocation] = useState(false);

  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.x;

    let imageIndex = Math.floor(position / (0.7 * width));
    if (imageIndex < 0) {
      imageIndex = 0;
    } else if (imageIndex > data?.length) {
      imageIndex = data?.length;
    }
    setFocusImageIndex(imageIndex);
    setIsPictureLocation(true);
    setIsUserLocation(false);
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="absolute top-7 z-10 flex-row justify-between w-full items-center space-x-2">
        <TouchableOpacity
          className="bg-stone-300 p-1 rounded-full ml-5"
          onPress={() => {
            navigation.navigate("Profile");
          }}>
          <Image
            source={{
              uri:
                user?.userPicture ||
                "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
            }}
            style={{ width: width / 12, height: width / 12 }}
            className="rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-stone-300 py-1.5 px-3 rounded-full"
          onPress={() => {
            navigation.navigate("Friend");
          }}>
          <FontAwesome5 name="user-friends" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-full bg-stone-300 p-1.5 mr-5"
          onPress={() => {
            navigation.navigate("MessageRoom");
          }}>
          {/* <MaterialIcons name="chat" size={40} color="black" /> */}
          <Ionicons name="chatbubble-outline" size={30} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      {user.currentLocation != undefined && (
        <Map
          i={focusImageIndex}
          data={data}
          isUserLocation={isUserLocation}
          setIsUserLocation={(bool) => setIsUserLocation(bool)}
          isPictureLocation={isPictureLocation}
          setIsPictureLocation={(bool) => setIsPictureLocation(bool)}
        />
      )}

      {showCard && (
        <View className="absolute bottom-24 h-1/3 w-full z-10 flex-row items-center space-x-2">
          <PictureList handleScroll={handleScroll} data={data} width={width} />
        </View>
      )}

      <View className="absolute bottom-3 w-full h-20 flex-row justify-between items-center px-5">
        <TouchableOpacity
          className=""
          onPress={() => {
            setIsUserLocation(true);
          }}>
          <Feather name="map-pin" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="">
          <FontAwesome name="camera" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          // className="bg-stone-300 rounded-3xl px-4 py-2"
          onPress={() => {
            setShowCard(!showCard);
          }}>
          <FontAwesome name="picture-o" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
