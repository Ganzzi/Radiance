import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const MessageScreen = ({ messageRoom, setShowEachRoom }) => {
  return (
    <View className="w-full flex-col justify-start items-center">
      <TouchableOpacity
        className="absolute top-5 left-2 z-20"
        onPress={() => setShowEachRoom(false)}>
        <AntDesign name="left" size={30} color="black" />
      </TouchableOpacity>

      <View className="absolute flex-row justify-center items-center top-3 h-12 w-full">
        <View className="flex-row justify-center items-center space-x-2">
          <Image
            source={{
              uri: messageRoom.users[0].userPicture,
            }}
            style={{ width: 33, height: 33 }}
            className="rounded-full"
          />
          <Text className="text-lg">{messageRoom.users[0].username}</Text>
        </View>
      </View>

      <View className="h-full w-full pb-16 pt-20 flex-col">
        <FlatList
          data={messageRoom.messages}
          renderItem={({ item, index }) => {
            if (item.senderId !== messageRoom.users[0]._id) {
              return (
                <View className="flex-row my-0.5 justify-end">
                  <View className="w-fit bg-gray-300 rounded-3xl py-2 px-2 mx-1">
                    <Text>{item.text}</Text>
                  </View>
                </View>
              );
            } else {
              let lastSent;
              if (index < messageRoom.messages.length - 1) {
                lastSent = messageRoom.messages[index + 1].senderId;
              }
              return (
                <View className="flex-row rounded-3xl my-0.5 justify-start">
                  <View className="w-full flex-row ">
                    {lastSent !== item.senderId && (
                      <Image
                        source={{
                          uri: messageRoom.users[0].userPicture,
                        }}
                        style={{ width: 33, height: 33 }}
                        className="rounded-full absolute left-0.5 bottom-0.5"
                      />
                    )}
                    <View className="ml-10 w-fit bg-gray-300 rounded-3xl py-2 px-2 ">
                      <Text>{item.text}</Text>
                    </View>
                  </View>
                </View>
              );
            }
          }}
        />
      </View>

      <View className="absolute bottom-0 h-14 w-full justify-start items-center">
        <View className="w-5/6 flex-row rounded-xl mx-3 justify-center bg-gray-400 py-0.5 px-3">
          <TextInput
            placeholder="Message"
            placeholderTextColor={"gray"}
            className="flex-1"
          />
          <TouchableOpacity className="bg-blue-700 rounded-xl px-2 py-1.5 my-0.5">
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MessageScreen;
