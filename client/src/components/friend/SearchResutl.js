import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import Button from "./Button";

const SearchResutl = ({ searchResult, user, onUpdate }) => {
  return (
    <View className="w-4/5 rounded-2xl bg-gray-200 p-2 space-y-2">
      <Text className="text-gray-900 text-xl font-bold">Search Result</Text>
      {searchResult.map((item, index) => (
        <View
          className="w-full flex-row justify-start items-center my-1"
          key={index}>
          <View className="flex-1 justify-start items-start">
            <TouchableOpacity className=" flex-row justify-start items-start space-x-2">
              <Image
                source={{
                  uri:
                    item.userPicture ||
                    "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
                }}
                style={{ width: 50, height: 50 }}
                className="rounded-full"
              />
              <Text className="text-xl">{item.username}</Text>
            </TouchableOpacity>
          </View>

          {item._id != user._id && (
            <>
              <Button
                state={item.state}
                onUpdate={onUpdate}
                item={item}
                user={user}
              />
            </>
          )}
        </View>
      ))}
    </View>
  );
};

export default SearchResutl;
