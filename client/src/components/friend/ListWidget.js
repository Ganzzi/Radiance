import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

const ListWidget = ({ data, state, onUpdate, user }) => {
  const navigation = useNavigation();

  return (
    <View className="w-4/5 flex-col justify-center items-start space-y-3 my-5">
      {state == "friend" && <Text>Your Friend</Text>}
      {state == "friendRequest" && <Text>Friend Request</Text>}
      {state == "requestSent" && <Text>Request Sent</Text>}
      <View className="w-full flex-col rounded-xl bg-gray-200 p-2">
        {data.length != 0 ? (
          data.map((item, index) => (
            <View className="w-full flex-row items-center my-1" key={index}>
              <View className="flex-1 justify-start items-start">
                <TouchableOpacity
                  className=" flex-row justify-start items-start space-x-2"
                  onPress={() => {
                    console.log("navigating..");
                    navigation.navigate("Profile", {
                      otherId: item._id,
                    });
                  }}>
                  <Image
                    source={{
                      uri: item.userPicture,
                    }}
                    style={{ width: 50, height: 50 }}
                    className="rounded-full"
                  />
                  <Text className="px-1 text-xl">{item.username}</Text>
                </TouchableOpacity>
              </View>

              <Button
                state={state}
                onUpdate={onUpdate}
                item={item}
                user={user}
              />
            </View>
          ))
        ) : (
          <Text className="text-xl text-center">none</Text>
        )}
      </View>
    </View>
  );
};

export default ListWidget;
