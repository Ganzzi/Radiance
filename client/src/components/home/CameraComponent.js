import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { PinchGestureHandler } from "react-native-gesture-handler";

import Loading from "../Loading";

const windowWidth = Dimensions.get("window").width;

const CameraComponent = ({ onClose, onCreate }) => {
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState("off");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [base64Img, setBase64Img] = useState(null);
  const [description, setDescription] = useState("");

  const cameraRef = useRef(null);

  const [zoom, setZoom] = useState(0);

  const changeZoom = (event) => {
    if (event.nativeEvent.scale > 1 && zoom < 1 - 0.015) {
      setZoom(zoom + 0.01);
    }
    if (event.nativeEvent.scale < 1 && zoom > 0.015) {
      setZoom(zoom - 0.01);
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();

      if (uri) {
        // Resize the image
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 400, height: 400 } }], // Adjust the dimensions as per your requirements
          {
            compress: 0.4,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        // Use the resized image URI
        setImage(uri);

        setBase64Img(`data:image/jpg;base64,${manipResult.base64}`);
      }
      // Handle the captured image URI as per your requirement
    }
  };

  return (
    <KeyboardAvoidingView
      className="justify-center items-center bg-black h-fit px-4 pt-14 space-y-10 rounded-3xl"
      behavior="padding">
      {/* Camera */}
      <View
        className="rounded-3xl"
        style={{
          //   borderRadius: 20,
          overflow: "hidden",
        }}>
        {image ? (
          <>
            <TouchableOpacity className="absolute w-full justify-center items-center flex-row z-10 bottom-3">
              <TextInput
                placeholder="How about your picture ?"
                className="w-fit bg-gray-300 text-2xl py-1 px-3 rounded-3xl justify-center items-center"
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
            </TouchableOpacity>
            <Image className="w-96 h-96 rounded-3xl" source={{ uri: image }} />
          </>
        ) : (
          <PinchGestureHandler onGestureEvent={(event) => changeZoom(event)}>
            <Camera
              style={{
                height: windowWidth - windowWidth / 15,
                width: windowWidth - windowWidth / 15,
              }}
              zoom={zoom}
              className="w-96 h-96"
              type={type}
              // autoFocus={true}
              flashMode={flashMode}
              ref={cameraRef}
            />
          </PinchGestureHandler>
        )}
      </View>

      {/* Button */}
      <View className="justify-center items-center flex-row  space-x-20 mb-14">
        <TouchableOpacity
          onPress={() => {
            setFlashMode(flashMode == "on" ? "off" : "on");
          }}
          className="">
          {!image ? (
            <Ionicons
              name={flashMode === "on" ? "flash" : "flash-off"}
              size={50}
              color="white"
            />
          ) : (
            <Ionicons
              name={flashMode === "on" ? "flash" : "flash-off"}
              size={50}
              color="black"
            />
          )}
        </TouchableOpacity>

        {image ? (
          <TouchableOpacity
            onPress={async () => {
              setIsLoading(true);
              const data = {
                base64Img: base64Img,
                description: description,
              };
              await onCreate(data);
              setIsLoading(false);
            }}
            className="">
            {!isLoading ? (
              <Feather name="send" size={70} color="white" />
            ) : (
              <Loading color={"white"} />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={takePicture} className="">
            {<FontAwesome name="circle-o" size={70} color="white" />}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={toggleCameraType} className="">
          <View className="flex-row justify-center items-center">
            {image ? (
              <MaterialCommunityIcons
                name="camera-retake"
                size={50}
                color="white"
                onPress={() => {
                  setImage(null);
                }}
              />
            ) : (
              <Ionicons name="md-camera-reverse" size={50} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Close Button */}
      <TouchableOpacity onPress={onClose} className="absolute -bottom-6">
        <SimpleLineIcons name="arrow-down" size={50} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} className="absolute -top-9 right-1">
        <Ionicons name="close-outline" size={50} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CameraComponent;
