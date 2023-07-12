import React, { useEffect } from "react";
import { Image, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../utils/socket";
import { setUserFriends } from "../../state";

const Map = ({ mapRef, data, currentLocation }) => {
  const { user, userFriends } = useSelector((state) => state.state);
  const dispatch = useDispatch();

  const initialRegion = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: currentLocation.latitudeDelta,
    longitudeDelta: currentLocation.longitudeDelta,
  };

  useEffect(() => {
    const handleReceiveLocation = (data) => {
      const updatedUserFriends = userFriends.map((friend) => {
        if (friend._id == data.userId) {
          const fr = {
            ...friend,
            currentLocation: data.location,
          };
          return fr;
        }
        return friend;
      });

      dispatch(setUserFriends({ userFriends: updatedUserFriends }));
    };

    socket.on("location-update", handleReceiveLocation);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("location-update", handleReceiveLocation);
    };
  }, [socket]);

  return (
    <MapView
      provider={Platform.OS == "android" ? PROVIDER_GOOGLE : undefined}
      ref={mapRef}
      initialRegion={initialRegion}
      className="flex-1 -mt-10 z-0"
      mapType="terrain">
      {/* pictures */}
      {data &&
        data.map((pic) => (
          <Marker
            coordinate={{
              latitude: pic?.location.latitude,
              longitude: pic?.location.longitude,
            }}
            pinColor
            key={pic._id}>
            <Image
              source={{
                uri: pic?.pictureUrl,
              }}
              style={{ width: 40, height: 40 }}
              className="rounded-full"
            />
          </Marker>
        ))}

      {userFriends &&
        userFriends.map((friend) => (
          <Marker
            coordinate={{
              latitude: friend.currentLocation.latitude,
              longitude: friend.currentLocation.longitude,
            }}
            pinColor
            key={friend._id}>
            <Image
              source={{
                uri: friend?.userPicture,
              }}
              style={{ width: 40, height: 40 }}
              className="rounded-full"
            />
          </Marker>
        ))}

      {/* current user's location */}
      <Marker
        coordinate={{
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
        }}
        pinColor>
        <Image
          source={{
            uri: user.userPicture,
          }}
          style={{ width: 40, height: 40 }}
          className="rounded-full"
        />
      </Marker>
    </MapView>
  );
};

export default Map;
