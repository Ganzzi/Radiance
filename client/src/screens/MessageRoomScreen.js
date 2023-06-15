import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axiosClient from "../axios-client";
import { useSelector } from "react-redux";
import MessageScreen from "./MessageScreen";
import { Ionicons } from "@expo/vector-icons";

const MessageRoomScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.state);
  const [messageRoom, setMessageRoom] = useState([]);
  const [showEachRoom, setShowEachRoom] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);

  useEffect(() => {
    const fetchMessageRooms = async () => {
      try {
        await axiosClient
          .get(`/user/${user._id}/messageRooms`)
          .then(({ data }) => {
            setMessageRoom(data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessageRooms();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {showEachRoom ? (
        <MessageScreen
          messageRoom={messageRoom[roomIndex]}
          setShowEachRoom={(bool) => setShowEachRoom(bool)}
        />
      ) : (
        <>
          <View
            className="w-full flex-row justify-between items-center px-3
        ">
            <TouchableOpacity
              className="px-2"
              onPress={() => navigation.navigate("Home")}>
              <Ionicons name="arrow-undo" size={30} color="black" />
            </TouchableOpacity>
            <View className="w-5/6 flex-row rounded-xl mx-3 justify-center bg-gray-400 py-0.5 px-3">
              <TextInput
                placeholder="Search"
                placeholderTextColor={"black"}
                className="w-full text-2xl text-black py-1 px-1"
              />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}>
            <View className="w-full flex-col my-5">
              {messageRoom.map((item, index) => (
                <TouchableOpacity
                  className="flex-row items-center space-x-3  justify-start px-5 py-2"
                  onPress={() => {
                    setShowEachRoom(true);
                    setRoomIndex(index);
                  }}
                  key={index}>
                  <View>
                    <Image
                      source={{
                        uri: item.users[0].userPicture,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      className="rounded-full"
                    />
                  </View>
                  <View className="flex-col flex-1 justify-center items-start ">
                    <View className="flex-row justify-start space-x-3 items-center">
                      <Text className="text-black font-bold text-lg">
                        {item.users[0].username}
                      </Text>
                      <Text className="text-gray-400">2d</Text>
                    </View>
                    <Text className="text-gray-700">
                      {item.messages[item.messages.length - 1].text}
                    </Text>
                  </View>

                  <View className="">
                    <Ionicons
                      name="ios-arrow-forward"
                      size={24}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default MessageRoomScreen;
