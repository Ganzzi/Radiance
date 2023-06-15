import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

let INTERESTS = [
  {
    name: "sport",
    isSelected: false,
  },
  {
    name: "music",
    isSelected: false,
  },
  {
    name: "work",
    isSelected: false,
  },
  {
    name: "study",
    isSelected: false,
  },
  {
    name: "travel",
    isSelected: false,
  },
];

const UpdateProfileModal = ({ user, onClose, onUpdate }) => {
  for (let j = 0; j < INTERESTS.length; j++) {
    if (user.interest.length != undefined) {
      for (let i = 0; i < user.interest.length; i++) {
        if (INTERESTS[j].name == user.interest[i]) {
          INTERESTS[j].isSelected = true;
        }
      }
    }
  }

  const [interests, setInterests] = useState(INTERESTS);
  const handleInterestPress = (name) => {
    const updatedInterests = interests.map((interest) =>
      interest.name === name
        ? { ...interest, isSelected: !interest.isSelected }
        : { ...interest }
    );
    setInterests(updatedInterests);

    let selectedInterest = [];
    for (let i = 0; i < updatedInterests.length; i++) {
      if (updatedInterests[i].isSelected == true) {
        selectedInterest.push(updatedInterests[i].name);
      }
    }

    handleInputChange("interests", selectedInterest);
  };
  let columnData = [];
  let column = [];
  for (let i = 0; i < interests.length; i++) {
    column.push(interests[i]);

    if (column.length === 3 || i === interests.length - 1) {
      columnData.push(column);
      column = [];
    }
  }

  const [userData, setUserData] = useState({
    photo: null,
    username: user.username,
    gender: user.gender,
    bio: user.bio,
    interests: user.interest,
    userPicture: user.userPicture,
  });

  // const handleGenderSelect = (gender) => {
  //   setUserData({ ...userData, gender: gender });
  // };

  const handleInputChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      // base64: true,
    });

    if (!result.canceled) {
      // Resize the image
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 400, height: 400 } }], // Adjust the dimensions as per your requirements
        {
          compress: 0.2,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      // Use the resized image URI
      setImage(manipResult.uri);

      // Convert the image to base64
      let base64Img = `data:image/jpg;base64,${manipResult.base64}`;

      // console.log(base64Img);

      handleInputChange("photo", base64Img);
    }
  };

  return (
    <View className="absolute h-full w-full items-center justify-center z-30">
      <View className="absolute flex-1 bg-gray-500 opacity-60  h-full w-full items-center justify-center"></View>

      <View className="w-full bg-black rounded-2xl h-4/5 mx-3 items-center">
        <TouchableOpacity onPress={onClose} className="absolute right-4 top-2">
          <FontAwesome name="close" size={40} color="red" />
        </TouchableOpacity>

        <View className="top-20 h-3/4">
          <ScrollView className="flex-col space-y-20">
            <View className="w-full mt-4">
              <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
                Image
              </Text>

              <View className="text-2xl text-white py-5 px-2 rounded-3xl bg-gray-900 mx-3 flex-col justify-between items-center space-y-5">
                {image && (
                  <Image
                    className="rounded-2xl"
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                <TouchableOpacity
                  className={`border-gray-500 px-7 py-2 rounded-3xl bg-black border-4 mx-1`}
                  onPress={pickImage}>
                  <Text className="text-2xl text-white text-center ">
                    Pick an image
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-full mt-4">
              <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
                Username
              </Text>
              <TextInput
                textAlign="center"
                defaultValue={user.username}
                onChangeText={(text) => handleInputChange("username", text)}
                className="text-2xl text-white p-5 rounded-full bg-gray-900 mx-3"
              />
            </View>

            <View className="w-full">
              <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
                Gender
              </Text>
              <View className="text-2xl text-white py-5 px-2 rounded-full bg-gray-900 mx-3 flex-row justify-between items-center">
                <TouchableOpacity
                  className={`${
                    userData.gender == "male"
                      ? "border-purple-900"
                      : "border-gray-500"
                  } px-7 py-2 rounded-3xl bg-black border-4 mx-1`}
                  onPress={() => {
                    handleInputChange("gender", "male");
                  }}>
                  <Text className="text-xl text-white">Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`${
                    userData.gender == "female"
                      ? "border-purple-900"
                      : "border-gray-500"
                  } px-5 py-2 rounded-3xl bg-black border-4 mx-1`}
                  onPress={() => {
                    handleInputChange("gender", "female");
                  }}>
                  <Text className="text-xl text-white">Female</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`${
                    userData.gender == "others"
                      ? "border-purple-900"
                      : "border-gray-500"
                  } px-5 py-2 rounded-3xl bg-black border-4 mx-1`}
                  onPress={() => {
                    handleInputChange("gender", "others");
                  }}>
                  <Text className="text-xl text-white">Others</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="w-full">
              <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
                Bio
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                textAlign="center"
                maxLength={52}
                defaultValue={user.bio}
                onChangeText={(text) => handleInputChange("bio", text)}
                className="text-2xl text-white p-5 rounded-full bg-gray-900 mx-3"
              />
            </View>

            <View className="w-full">
              <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
                Interest
              </Text>
              <View className="text-2xl text-white p-5 rounded-3xl bg-gray-900 mx-3 flex-col justify-between items-center">
                {columnData.map((item, index) => (
                  <View className="flex-row" key={index}>
                    {item.map((item) => (
                      <TouchableOpacity
                        key={item.name}
                        className={`${
                          item.isSelected
                            ? "border-purple-900"
                            : "border-gray-500"
                        } px-7 py-2 rounded-3xl bg-black border-4 mx-1 my-1`}
                        onPress={() => handleInterestPress(item.name)}>
                        <Text className="text-xl text-white">{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          className="absolute bottom-6 bg-purple-400 rounded-3xl px-5 py-2"
          onPress={() => {
            // console.log(userData);
            onUpdate(userData);
          }}>
          <Text className="text-3xl">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfileModal;
