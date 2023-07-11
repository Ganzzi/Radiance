import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ color, size = 24 }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
