import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    top: 0,
  },
});

const Pagination = ({ paginationIndex, scrollToIndex, showMessage, size }) => {
  const realSize = showMessage ? size : size - 1;

  return (
    <View
      className={`flex-row mt-3 items-center space-x-5 justify-center absolute top-0 w-full`}>
      {showMessage && (
        <TouchableOpacity
          className=" rounded-full p-1 items-center justify-center"
          onPress={async () => {
            scrollToIndex({ index: realSize - 3 });
          }}>
          <AntDesign
            name="message1"
            size={38}
            color={paginationIndex == realSize - 3 ? "purple" : "white"}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className="rounded-full p-1 items-center justify-center"
        onPress={async () => {
          scrollToIndex({ index: realSize - 2 });
        }}>
        <AntDesign
          name="hearto"
          size={40}
          color={paginationIndex == realSize - 2 ? "purple" : "white"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="rounded-full p-1 items-center justify-center"
        onPress={async () => {
          scrollToIndex({ index: realSize - 1 });
        }}>
        <FontAwesome5
          name="comment-alt"
          size={36}
          color={paginationIndex == realSize - 1 ? "purple" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
