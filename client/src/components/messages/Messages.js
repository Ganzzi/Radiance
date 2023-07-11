import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import axiosClient from "../../utils/axios-client.js";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";

const Messages = ({ messageRoom, setShowEachRoom, setMessageRoom }) => {
  const { user } = useSelector((state) => state.state);

  const [messageRequest, setMessageRequest] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data.from == messageRoom.users[0]._id) {
        const updatedMessages = [...messageRoom.messages, data.msg];

        console.log("mes");
        setMessageRoom({ ...messageRoom, messages: updatedMessages });
      }
    };

    socket.on("recieve-msg", handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("recieve-msg", handleReceiveMessage);
    };
  }, [socket, messageRoom]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };

  const handleSubmit = async () => {
    setMessageRequest("");

    await axiosClient
      .post(`/messages/${user._id}/${messageRoom.users[0]._id}/createMessage`, {
        type: "text",
        content: {
          text: messageRequest,
        },
      })
      .then((response) => {
        if (response.status == 201) {
          // update messages array
          const updatedMessages = [
            ...messageRoom.messages,
            response.data.newMessage,
          ];
          // call set room hook that set current room to All room array
          setMessageRoom({ ...messageRoom, messages: updatedMessages });
          // scrollToBottom();

          socket.emit("send-msg", {
            from: user._id,
            roomId: messageRoom._id,
            to: messageRoom.users[0]._id,
            msg: response.data.newMessage,
          });
        }
      });
  };

  return (
    <View className="w-full flex-col justify-between items-center bg-black">
      {/* back button */}
      <TouchableOpacity
        className="absolute top-5 left-2 z-20"
        onPress={() => setShowEachRoom(false)}>
        <AntDesign name="left" size={30} color="white" />
      </TouchableOpacity>

      {/* other info */}
      <View className="absolute flex-row justify-center items-center top-3 h-12 w-full">
        <View className="flex-row justify-center items-center space-x-2">
          <Image
            source={{
              uri: messageRoom.users[0].userPicture,
            }}
            style={{ width: 33, height: 33 }}
            className="rounded-full"
          />
          <Text className="text-lg text-white">
            {messageRoom.users[0].username}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : undefined}
        className="w-full h-full flex-col justify-between items-center">
        {/* message place */}
        <View className="flex-1 w-full mt-14">
          <FlatList
            ref={flatListRef}
            data={messageRoom.messages.slice().reverse()}
            renderItem={({ item, index }) => {
              // current user
              if (item.senderId !== messageRoom.users[0]._id) {
                return (
                  <>
                    <View className="flex-row my-0.5 justify-end">
                      <View
                        className="w-fit bg-black rounded-3xl py-2 px-2 mx-1 border-white"
                        style={{
                          borderWidth: 0.5,
                        }}>
                        <Text className="text-white">{item?.content.text}</Text>
                      </View>
                    </View>
                    {item?.type == "picture" && (
                      <View className="flex-row my-0.5 justify-end">
                        <Image
                          source={{
                            uri: item?.content.pictureUrl,
                          }}
                          width={100}
                          height={100}
                          className="rounded-3xl mx-1"
                        />
                      </View>
                    )}
                  </>
                );
              } else {
                let previousSenderId;
                if (index > 0) {
                  previousSenderId = messageRoom.messages.slice().reverse()[
                    index - 1
                  ].senderId;
                }
                return (
                  <>
                    <View className="flex-row rounded-3xl my-0.5 justify-start">
                      <View className="w-full flex-row ">
                        {previousSenderId !== item.senderId && (
                          <Image
                            source={{
                              uri: messageRoom.users[0].userPicture,
                            }}
                            style={{ width: 33, height: 33 }}
                            className="rounded-full absolute left-0.5 bottom-0.5"
                          />
                        )}
                        <View
                          className="ml-10 w-fit bg-black rounded-3xl py-2 px-2  border-white"
                          style={{
                            borderWidth: 0.5,
                          }}>
                          <Text className="text-white">
                            {item?.content.text}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {item?.type == "picture" && (
                      <View className="flex-row my-0.5 justify-start">
                        <Image
                          source={{
                            uri: item?.content.pictureUrl,
                          }}
                          width={100}
                          height={100}
                          className="rounded-3xl mx-3"
                        />
                      </View>
                    )}
                  </>
                );
              }
            }}
            onContentSizeChange={() => scrollToBottom()}
            onLayout={() => scrollToBottom()}
            inverted
          />
        </View>

        {/* Input */}
        <View className="pb-14 w-full justify-start items-center ">
          <View className="w-5/6 flex-row rounded-xl mx-3 justify-center bg-gray-200 py-1 px-3">
            <TextInput
              placeholder="Message"
              placeholderTextColor={"gray"}
              className="flex-1"
              value={messageRequest}
              onChangeText={(text) => setMessageRequest(text)}
            />
            <TouchableOpacity
              className="bg-blue-700 rounded-xl px-2 py-1 my-1"
              onPress={handleSubmit}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Messages;
