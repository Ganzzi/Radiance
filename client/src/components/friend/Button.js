import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Loading from "../Loading";
import axiosClient from "../../utils/axios-client.js";
import socket from "../../utils/socket";

const Button = ({ state, onUpdate, item, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleFriendRequestOrCancel = async (friendId, type) => {
    try {
      await axiosClient
        .patch(`/user/${user._id}/${friendId}/sendOrCancelFriendRequest`, {
          type: type,
        })
        .then(async (response) => {
          if (response.status === 200) {
            await onUpdate(type);
            socket.emit("add-cancel-request", {
              from: user._id,
              to: friendId,
              type: type,
            });
          } else {
            // Handle other response status codes
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptOrDeleteRequest = async (friendId, type) => {
    try {
      await axiosClient
        .patch(`/user/${user._id}/${friendId}/acceptOrRemoveFriendRequest`, {
          type: type,
        })
        .then(async (response) => {
          if (response.status === 200) {
            await onUpdate(type);
            socket.emit("accept-delete-request", {
              from: user._id,
              to: friendId,
              type: type,
            });
          } else {
            // Handle other response status codes
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFriend = async (friendId, type) => {
    try {
      await axiosClient
        .patch(`/user/${user._id}/${friendId}/removeFriend`)
        .then(async (response) => {
          if (response.status === 200) {
            await onUpdate(type);
            socket.emit("remove-friend", {
              from: user._id,
              to: friendId,
              type: type,
            });
          } else {
            // Handle other response status codes
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {state == "" && (
        <>
          {isLoading ? (
            <TouchableOpacity className="rounded-2xl bg-yellow-300 p-2 mx-1">
              <Loading color={"#000000"} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                className="rounded-2xl bg-yellow-300 py-2 px-4 mx-1"
                onPress={async () => {
                  setIsLoading(true);

                  await handleFriendRequestOrCancel(item._id, "add");

                  setIsLoading(false);
                }}>
                <AntDesign name="adduser" size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {state == "friend" && (
        <>
          {isLoading ? (
            <TouchableOpacity className="rounded-2xl bg-yellow-300 p-2 mx-1">
              <Loading color={"#000000"} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                className="rounded-2xl bg-yellow-300 p-2 mx-1"
                onPress={async () => {
                  setIsLoading(true);
                  await handleRemoveFriend(item._id, "remove");
                  setIsLoading(false);
                }}>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-2xl bg-yellow-300 p-2 mx-1"
                onPress={async () => {
                  setIsLoading(true);

                  navigation.navigate("MessageRoom", {
                    otherId: item._id,
                  });

                  setIsLoading(false);
                }}>
                <Ionicons name="chatbubble-ellipses" size={24} color="black" />
              </TouchableOpacity>
              {/* <TouchableOpacity
                className="rounded-2xl bg-yellow-300 p-2 mx-1"
                onPress={async () => {
                  setIsLoading(true);
                  
                  setIsLoading(false);
                }}>
                <FontAwesome name="file-picture-o" size={24} color="black" />
              </TouchableOpacity> */}
            </>
          )}
        </>
      )}

      {state == "friendRequest" && (
        <>
          {isLoading ? (
            <TouchableOpacity className="rounded-2xl bg-yellow-300 p-2 mx-1">
              <Loading color={"#000000"} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                className="rounded-2xl bg-yellow-300 p-2 mx-1"
                onPress={async () => {
                  setIsLoading(true);

                  await handleAcceptOrDeleteRequest(item._id, "accept");

                  setIsLoading(false);
                }}>
                <AntDesign name="check" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-2xl bg-yellow-300 p-2 mx-1"
                onPress={async () => {
                  setIsLoading(true);

                  await handleAcceptOrDeleteRequest(item._id, "delete");

                  setIsLoading(false);
                }}>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {state == "requestSent" && (
        <>
          {isLoading ? (
            <TouchableOpacity className="rounded-2xl bg-yellow-300 p-2 mx-1">
              <Loading color={"#000000"} />
            </TouchableOpacity>
          ) : (
            <>
              {item._id != user._id && (
                <TouchableOpacity
                  className="rounded-2xl bg-yellow-300 p-2 mx-1"
                  onPress={async () => {
                    setIsLoading(true);

                    await handleFriendRequestOrCancel(item._id, "cancel");

                    setIsLoading(false);
                  }}>
                  <MaterialIcons name="cancel" size={24} color="black" />
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      )}

      {/* <Loading color={"#000000"} /> */}
    </>
  );
};

export default Button;
