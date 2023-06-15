import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import PictureCard from "./PictureCard";

const PictureList = ({ handleScroll, data, width }) => {
  return (
    <FlatList
      key={data._id}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={1}
      horizontal={true}
      data={data}
      onScroll={handleScroll}
      // keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <PictureCard item={item} index={index} width={width} data={data} />
      )}
    />
  );
};

export default PictureList;
