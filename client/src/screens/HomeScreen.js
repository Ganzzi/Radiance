import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import SwiperFlatList from "react-native-swiper-flatlist";
import { Camera } from "expo-camera";
import MapView from "react-native-maps";

import { Map, PictureCard } from "../components";
import { setLogin, setUserFriends } from "../state";
import socket from "../utils/socket";
import axiosClient, { clearAxiosCache } from "../utils/axios-client.js";
import CameraComponent from "../components/home/CameraComponent";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    // return;
  }
  if (data) {
    const { locations } = data;
  }
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;
  const { user, token, userFriends } = useSelector((state) => state.state);

  const [showCard, setShowCard] = useState(false);
  const [data, setData] = useState([]);
  const [isLocationPermissed, setIsLocationPermissed] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const [cameraOpen, setCameraOpen] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    if (user && token) {
      retrievePictures();
    }
  }, [user._id, userFriends, token]);

  useEffect(() => {
    const forcusUserLocation = async () => {
      const location = await getLocation();

      setCurrentLocation(location);
      mapRef.current?.animateToRegion(
        { ...location, latitude: location.latitude - 0.005 },
        1500
      );
    };

    const updateLocation = async () => {
      try {
        const { coords } = await Location.getCurrentPositionAsync();

        const location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        };

        await axiosClient
          .patch(`/user/${user._id}/updateLocation`, {
            currentLocation: location,
          })
          .then(async (response) => {
            if (response.status === 200) {
            }
          });

        socket.emit("update-location", {
          userId: user._id,
          updatedLocation: location,
        });
      } catch (error) {
        // console.log("Error updating location:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        await axiosClient.get(`/user/${user._id}/friends`).then(({ data }) => {
          dispatch(setUserFriends({ userFriends: data }));
        });
      } catch (error) {
        // Handle any errors
      }
    };

    fetchFriends();
    forcusUserLocation();
    requestPermissions();

    // Start updating location periodically
    const interval = setInterval(updateLocation, 20000); // Update location every 20 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user._id) {
      socket.emit("add-online-user", user._id);
    }
  }, [user._id]);

  useEffect(() => {
    const handleReceivePicture = (updatedPicture) => {
      setData((prevPictures) => [updatedPicture, ...prevPictures]);
    };

    const handleDeletePicture = (pictureId) => {
      setData(data.filter((pic) => pic._id !== pictureId));
    };

    const handleUpdatePicture = (updatedPicture) => {
      setData((prevPictures) =>
        prevPictures.map((picture) => {
          if (picture._id === updatedPicture._id) {
            return updatedPicture;
          } else {
            return picture;
          }
        })
      );
    };

    socket.on("recieve-new-picture", handleReceivePicture);
    socket.on("picture-deleted", handleDeletePicture);
    socket.on("picture-updated", handleUpdatePicture);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("recieve-new-picture", handleReceivePicture);
      socket.off("picture-deleted", handleDeletePicture);
      socket.off("picture-updated", handleUpdatePicture);
    };
  }, [socket, data]);

  const handleCameraButtonPress = () => {
    setCameraOpen(!cameraOpen);
  };

  const handleCloseButtonPress = () => {
    setCameraOpen(false);
  };

  const retrievePictures = async () => {
    clearAxiosCache();

    try {
      await axiosClient
        .get(`/pictures/${user._id}/pictures`)
        .then(async (response) => {
          if (response.status == 500) {
            await retrievePictures();
          }
          if (response.status == 403) {
            setIsNonePicture(true);
          } else if (response?.data?.pictures?.length > 0) {
            setData(response.data.pictures.reverse());
          }
        });
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.x;

    let imageIndex = Math.floor(position / (0.7 * width));
    if (imageIndex < 0) {
      imageIndex = 0;
    } else if (imageIndex > data.length - 1) {
      imageIndex = data.length - 1;
    }

    const location = {
      latitude: data[imageIndex].location.latitude,
      longitude: data[imageIndex].location.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };

    if (location.latitude && location.longitude) {
      mapRef.current?.animateToRegion(
        { ...location, latitude: location.latitude - 0.005 },
        500
      );
    }
  };

  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === "granted") {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === "granted") {
        setIsLocationPermissed(true);
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          deferredUpdatesInterval: 60 * 1000,
          deferredUpdatesDistance: 100,
        });
      }
    } else {
      setIsLocationPermissed(false);
    }
  };

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };
  };

  const handleCreatePicture = async (data) => {
    const currentPictureLocation = await getLocation();

    try {
      await axiosClient
        .post("/pictures", {
          takerId: user._id,
          location: {
            latitude: currentPictureLocation.latitude || null,
            longitude: currentPictureLocation.longitude || null,
          },
          photo: data.base64Img,
          description: data.description,
        })
        .then(async (response) => {
          if (response.status === 201) {
            // Assuming you receive the newly created picture object in the response
            const updatedPicture = response.data.updatedPicture;

            // Update the state variable 'pictures' by adding the new picture at the beginning
            setData((prevPictures) => [updatedPicture, ...prevPictures]);

            socket.emit("create-picture", updatedPicture);

            handleCameraButtonPress();
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1">
      {!isLocationPermissed && (
        <View className="absolute w-full h-full items-center justify-center z-30">
          <View className="absolute w-full h-full bg-gray-400 opacity-90" />
          {!isLocationPermissed && (
            <Text className="text-red-600 text-lg">
              Location permissions dinied
            </Text>
          )}
          <TouchableOpacity
            onPress={requestPermissions}
            className="bg-blue-700 rounded-2xl p-5">
            <Text className="text-xl">Enable background location</Text>
          </TouchableOpacity>
        </View>
      )}

      <SafeAreaView className="absolute top-7 z-10 flex-row justify-between w-full items-center space-x-2">
        <TouchableOpacity
          className="bg-stone-300 p-1 rounded-full ml-5"
          onPress={() => {
            navigation.navigate("Profile");
          }}>
          <Image
            source={{
              uri: user?.userPicture,
            }}
            style={{ width: width / 12, height: width / 12 }}
            className="rounded-full"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-stone-300 py-1.5 px-3 rounded-full"
          onPress={() => {
            navigation.navigate("Friend");
          }}>
          <FontAwesome5 name="user-friends" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-full bg-stone-300 p-1.5 mr-5"
          onPress={() => {
            navigation.navigate("MessageRoom");
          }}>
          {/* <MaterialIcons name="chat" size={40} color="black" /> */}
          <Ionicons name="chatbubble-outline" size={30} color="black" />
        </TouchableOpacity>
      </SafeAreaView>

      {currentLocation.latitude ? (
        <Map mapRef={mapRef} data={data} currentLocation={currentLocation} />
      ) : (
        <MapView
          mapType="terrain"
          initialRegion={{
            latitude: 10.828474724,
            longitude: 106.675570589,
            latitudeDelta: 1.015,
            longitudeDelta: 1.015,
          }}
          className="flex-1 -mt-10 z-0"
        />
      )}

      {showCard && (
        <View className="w-full h-full absolute justify-end">
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : undefined}
            className="w-full z-10 flex-col justify-end items-end h-fit">
            <View className="w-full h-fit mb-20">
              <View className="">
                <SwiperFlatList
                  index={0}
                  onScroll={handleScroll}
                  data={data}
                  renderItem={({ item, index }) => (
                    <PictureCard
                      item={item}
                      index={index}
                      width={width}
                      data={data}
                      setData={setData}
                      user={user}
                    />
                  )}
                  showPagination={false}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}

      <View className="absolute bottom-3 z-20 w-full justify-center items-center">
        <View className=" flex-row justify-center items-center space-x-14 px-8 py-6 rounded-full w-fit">
          <TouchableOpacity
            onPress={() => {
              if (data.length > 0) {
                const location = {
                  latitude: data[0]?.location.latitude,
                  longitude: data[0]?.location.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                };

                setShowCard(!showCard);
                if (!showCard) {
                  mapRef.current?.animateToRegion(
                    { ...location, latitude: location.latitude - 0.005 },
                    1500
                  );
                } else {
                }
              }
            }}>
            <FontAwesome name="picture-o" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="" onPress={handleCameraButtonPress}>
            <FontAwesome name="camera" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className=""
            onPress={() => {
              setShowCard(false);
              mapRef.current?.animateToRegion(currentLocation, 500);
            }}>
            <Feather name="map-pin" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {cameraOpen && (
        <View className="absolute z-50 w-full inset-y-0 flex items-center justify-center">
          <View className="bg-gray-400 opacity-70 absolute  w-full  h-full"></View>
          <CameraComponent
            onClose={handleCloseButtonPress}
            onCreate={(data) => handleCreatePicture(data)}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
