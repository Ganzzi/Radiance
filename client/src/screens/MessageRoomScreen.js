import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import axiosClient from "../utils/axios-client.js";
import Messages from "../components/messages/Messages";
import { formatTime } from "../utils";
import socket from "../utils/socket";

const MessageRoomScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.state);
  const { otherId } = route.params || {};

  const [messageRoom, setMessageRoom] = useState([]);
  const [showEachRoom, setShowEachRoom] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);

  useEffect(() => {
    const fetchMessageRooms = async () => {
      try {
        await axiosClient
          .get(`/messages/${user._id}/messageRooms`)
          .then(({ data }) => {
            let found = false;
            if (otherId) {
              for (let i = 0; i < data.length; i++) {
                if (data[i]?.users[0]._id == otherId) {
                  found = true;
                  setRoomIndex(i);
                  break;
                }
              }
            }

            setMessageRoom(data);
            found && setShowEachRoom(true);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessageRooms();
  }, []);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const nextMessageRoom = messageRoom.map((room) => {
        if (data.roomId == room._id) {
          return {
            ...room,
            messages: [...room.messages, data.msg],
          };
        } else return room;
      });

      setMessageRoom(nextMessageRoom);
    };

    socket.on("recieve-msg", handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("recieve-msg", handleReceiveMessage);
    };
  }, [socket, showEachRoom]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {showEachRoom ? (
        <Messages
          messageRoom={messageRoom[roomIndex]}
          setMessageRoom={(currentRoom) => {
            const nextMessageRoom = messageRoom.map((room, i) => {
              if (i == roomIndex) {
                return currentRoom;
              } else return room;
            });

            setMessageRoom(nextMessageRoom);
          }}
          setShowEachRoom={(bool) => setShowEachRoom(bool)}
        />
      ) : (
        <>
          <View
            className="w-full flex-row justify-between items-center px-3
        ">
            {/* back button */}
            <TouchableOpacity
              className="px-2"
              onPress={() => navigation.navigate("Home")}>
              <Ionicons name="arrow-undo" size={30} color="white" />
            </TouchableOpacity>

            {/* search bar */}
            {/* <View className="w-5/6 flex-row rounded-xl mx-3 justify-center bg-gray-400 py-0.5 px-3">
              <TextInput
                placeholder="Search"
                placeholderTextColor={"black"}
                className="w-full text-2xl text-black py-1 px-1"
              />
            </View> */}
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}>
            <View className="w-full flex-col my-5">
              {messageRoom.length != 0 &&
                messageRoom.map((item, index) => (
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
                        <Text className="text-white font-bold text-lg">
                          {item.users[0].username}
                        </Text>
                        <Text className="text-gray-400">
                          {formatTime(
                            item.messages[item.messages.length - 1].createdAt
                          )}
                        </Text>
                      </View>

                      <Text className="text-gray-200">
                        {item.messages[item.messages.length - 1].content.text}
                      </Text>
                    </View>

                    <View className="">
                      <Ionicons
                        name="ios-arrow-forward"
                        size={24}
                        color="white"
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
