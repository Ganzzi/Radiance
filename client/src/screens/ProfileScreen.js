import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { setLogout, setUser } from "../state";
import { UpdateProfileModal } from "../components";
import axiosClient from "../utils/axios-client.js";

const ProfileScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.state);
  const { otherId } = route.params || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    interest: [],
    bio: "",
    gender: "",
    username: "",
    userPicture: "",
    phoneNumber: "",
    friendIds: [],
  });

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

  const handleDeleteAccount = async () => {
    await axiosClient
      .delete(`/user/${user._id}/remove`)
      .then(async (response) => {
        if (response.status === 202) {
          await handleLogout();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("CURRENT_USER");
    await AsyncStorage.removeItem("ACCESS_TOKEN");
    dispatch(setLogout());
    navigation.navigate("Login");
  };

  useEffect(() => {
    const getProfileData = async () => {
      if (!otherId) {
        setUserProfile({
          friendIds: user.friendIds,
          interest: user.interest,
          bio: user.bio,
          gender: user.gender,
          username: user.username,
          userPicture: user.userPicture,
          phoneNumber: user.phoneNumber,
        });
      } else {
        await axiosClient.get(`/user/${otherId}`).then(({ data }) => {
          setUserProfile({
            interest: data.interest,
            bio: data.bio,
            gender: data.gender,
            username: data.username,
            userPicture: data.userPicture,
            phoneNumber: data.phoneNumber,
            friendIds: data.friendIds,
          });
        });
      }
    };
    getProfileData();
  }, [otherId, user]);

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
            {userProfile.userPicture && (
              <Image
                source={{
                  uri: userProfile.userPicture,
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
                {userProfile?.username}
              </Text>
              <Text className="text-gray-600">{userProfile?.gender}</Text>
            </View>
            {!otherId && (
              <TouchableOpacity
                className="p-3"
                onPress={() => {
                  setIsModalOpen(true);
                }}>
                <MaterialIcons name="edit" size={40} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="w-full flex-row justify-center items-center mt-5 px-5">
          <Text>{userProfile?.bio}</Text>
        </View>
        <View className="w-full flex-row justify-center items-center mb-8 px-5 py-2 ">
          <Text className="absolute top-3 z-10 left-4 text-lg text-gray-500 bg-slate-100">
            {otherId ? `${userProfile.username}'s interest` : "  My interest"}
          </Text>
          {userProfile?.interest?.length != 0 ? (
            <View className="mt-16 flex-row flex-wrap justify-center">
              {userProfile?.interest &&
                userProfile.interest.map((item, index) => (
                  <View
                    key={index}
                    className="w-1/3 max-w-xs h-14 py-2  flex items-center justify-center">
                    <View className="w-2/3 h-full rounded-3xl bg-gray-300 flex items-center justify-center">
                      <Text className="text-lg text-gray-900 font-medium">
                        {item}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          ) : (
            <View className="mt-16 w-full h-10 justify-center items-center">
              {user._id == otherId ? (
                <Text>Update your interest now!</Text>
              ) : (
                <Text>None</Text>
              )}
            </View>
          )}
        </View>

        <View className="w-full flex-row justify-center items-center my-5 px-10">
          {/* <Text className="text-2xl">Phone: </Text> */}
          <Text className="text-2xl space-x-3">{userProfile?.phoneNumber}</Text>
        </View>
        {!otherId ? (
          <>
            <View className="w-full items-center px-10 my-5">
              <TouchableOpacity
                className="w-full flex-row justify-between items-center"
                onPress={() => {
                  navigation.navigate("Friend");
                }}>
                <Text className="text-2xl">
                  {userProfile?.friendIds.length} Friends
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full items-center px-10 my-5">
              <TouchableOpacity
                className="w-full flex-row justify-between items-center"
                onPress={handleLogout}>
                <Text className="text-2xl">Logout </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full items-center px-10 my-5">
              <TouchableOpacity
                className="px-5 py-2 flex-row justify-center rounded-3xl bg-red-500 items-center"
                onPress={handleDeleteAccount}>
                <Text className="text-2xl font-bold">Delete Account </Text>
                <MaterialIcons name="delete-forever" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="w-full items-center px-10 my-5">
            <View className="w-full flex-row justify-center items-center">
              <Text className="text-2xl">
                {userProfile?.friendIds.length} Friends
              </Text>
            </View>
          </View>
        )}
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
