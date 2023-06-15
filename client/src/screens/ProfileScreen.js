import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { setLogout, setUser } from "../state";
import { UpdateProfileModal } from "../components";
import axiosClient from "../axios-client";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, user } = useSelector((state) => state.state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleUpdateModal = async (data) => {
    await axiosClient
      .patch(`/user/${user._id}/updateUserProfile`, data)
      .then(async ({ data }) => {
        const userjson = JSON.stringify(data.user);
        await AsyncStorage.setItem("CURRENT_USER", userjson);

        const userjson2 = await AsyncStorage.getItem("CURRENT_USER");
        const user2 = JSON.parse(userjson2);

        dispatch(setUser({ user: user2 }));
      });

    setIsModalOpen(false);
  };

  return (
    <View className="flex-1 ">
      <SafeAreaView className="flex-1 flex-col justify-start items-center">
        <View className="w-full flex-row my-3 items-center justify-center">
          <TouchableOpacity
            className=" absolute top-0 left-3"
            onPress={() => {
              navigation.navigate("Home");
            }}>
            <Ionicons name="arrow-undo" size={30} color="black" />
          </TouchableOpacity>

          <Text className="text-2xl">profile</Text>
        </View>
        <View className="w-full flex-row justify-center items-center">
          <View className="w-2/5 justify-center items-center">
            {user != null && (
              <Image
                source={{
                  uri:
                    user?.userPicture ||
                    "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
                }}
                style={{
                  width: 120,
                  height: 120,
                }}
                className="rounded-full"
              />
            )}
          </View>
          <View className="flex-row justify-start items-center w-3/5">
            <View className="flex-col justify-center items-start flex-1 space-y-2">
              <Text className="text-2xl font-bold text-black">
                {user?.username}
              </Text>
              <Text className="text-gray-600">{user?.gender}</Text>
            </View>
            <TouchableOpacity
              className="p-3"
              onPress={() => {
                setIsModalOpen(true);
              }}>
              <MaterialIcons name="edit" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full flex-row justify-center items-center mt-5 px-5">
          <Text>{user?.bio}</Text>
        </View>
        <View className="w-full flex-row justify-center items-center mb-8 px-5 py-2 ">
          <Text className="absolute top-3 z-10 left-4 text-lg text-gray-500 bg-slate-100">
            My Interest
          </Text>
          {user?.interest?.length != undefined ? (
            <FlatList
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={1}
              horizontal={true}
              data={user?.interest}
              className="mt-16 w-full"
              renderItem={({ item, index }) => (
                <View className="w-32 max-h-20 min-h-10 py-5 items-center justify-center">
                  <View className="w-2/3 h-full rounded-3xl bg-gray-300 justify-center items-center">
                    <Text className="text-lg text-gray-900 font-medium">
                      {item}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View className="mt-16 w-full h-10 justify-center items-center">
              <Text>Update your interest now!</Text>
            </View>
          )}
        </View>

        <View className="w-full flex-row justify-start items-center my-5 px-10">
          <Text className="text-2xl">Phone: </Text>
          <Text className="text-2xl space-x-3">{user?.phoneNumber}</Text>
        </View>
        <View className="w-full items-center px-10 my-5">
          <TouchableOpacity className="w-full flex-row justify-between items-center">
            <Text className="text-2xl">Friend Request </Text>
            <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View className="w-full items-center px-10 my-5">
          <TouchableOpacity className="w-full flex-row justify-between items-center">
            <Text className="text-2xl">Sent Requests </Text>
            <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View className="w-full items-center px-10 my-5">
          <TouchableOpacity className="w-full flex-row justify-between items-center">
            <Text className="text-2xl">Delete Account </Text>
            <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View className="w-full items-center px-10 my-5">
          <TouchableOpacity
            className="w-full flex-row justify-between items-center"
            onPress={async () => {
              await AsyncStorage.removeItem("CURRENT_USER");
              await AsyncStorage.removeItem("ACCESS_TOKEN");
              dispatch(setLogout());
              navigation.navigate("Login");
            }}>
            <Text className="text-2xl">Logout </Text>
            <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isModalOpen && (
        <UpdateProfileModal
          user={user}
          onClose={handleCloseModal}
          onUpdate={(data) => handleUpdateModal(data)}
        />
      )}
    </View>
  );
};

export default ProfileScreen;
