import React, { useState } from "react";
import { Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

const Map = ({
  i,
  data,
  isUserLocation,
  setIsUserLocation,
  setIsPictureLocation,
  isPictureLocation,
}) => {
  const { user, token } = useSelector((state) => state.state);

  const initialRegion = {
    latitude: user.currentLocation.latitude - 0.005 || 100,
    longitude: user.currentLocation.longitude || 100,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };

  const region = isUserLocation
    ? initialRegion
    : isPictureLocation && {
        latitude: data[i]?.location.latitude - 0.005,
        longitude: data[i]?.location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      };

  // console.log("rg");
  // console.log(region);
  // console.log(user);

  return (
    <MapView
      initialRegion={initialRegion}
      region={region || null}
      className="flex-1 -mt-10 z-0"
      onRegionChange={(rg) => {
        if (rg != region) {
          setIsUserLocation(false);
          setIsPictureLocation(false);
        }
      }}
      // customMapStyle={mapStyle}
      mapType="terrain">
      {data.map((pic) => (
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
            className="rounded-2xl "
          />
        </Marker>
      ))}

      {/* current user's location */}
      <Marker
        coordinate={{
          latitude: user.currentLocation?.latitude,
          longitude: user.currentLocation?.longitude,
        }}
        pinColor>
        <Image
          source={{
            uri:
              user.userPicture ||
              "https://img.hoidap247.com/picture/question/20210904/large_1630765811060.jpg",
          }}
          style={{ width: 40, height: 40 }}
          className="rounded-2xl "
        />
      </Marker>
    </MapView>
  );
};

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];

export default Map;
