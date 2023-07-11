import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosClient from "../utils/axios-client.js";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ListWidget, SearchResutl } from "../components";
import { setUserFriends } from "../state";
import socket from "../utils/socket";

const FriendScreen = () => {
  const navigation = useNavigation();
  const { user, token, userFriends } = useSelector((state) => state.state);

  const dispatch = useDispatch();

  // const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [requestSents, setRequestSents] = useState([]);

  const [searchRequest, setsearchRequest] = useState("");
  const [searchResult, setsearchResult] = useState([]);

  useEffect(() => {
    handleSeachUser();
  }, [userFriends, friendRequests, requestSents]);

  useEffect(() => {
    // fetchFriends();
    fetchFriendRequests();
    fetchRequestSents();
  }, []);

  useEffect(() => {
    const handleUpdateRequest = async (data) => {
      switch (data.type) {
        case "remove":
          await handleRemoveFriendSuccess();
          break;
        case "add":
          await handleAcceptOrDeleteRequestSuccess(data.type);
          break;
        case "cancel":
          await handleAcceptOrDeleteRequestSuccess(data.type);

          break;
        case "accept":
          await handleAddOrCancelSuccess(data.type);

          break;
        case "delete":
          await handleAddOrCancelSuccess(data.type);
          break;
        default:
          break;
      }
    };

    socket.on("request-added-cancelled", handleUpdateRequest);
    socket.on("request-accepted-deleted", handleUpdateRequest);
    socket.on("friend-removed", handleUpdateRequest);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("request-added-cancelled", handleUpdateRequest);
      socket.off("request-accepted-deleted", handleUpdateRequest);
      socket.off("friend-removed", handleUpdateRequest);
    };
  }, [socket]);

  const handleAddOrCancelSuccess = async (type) => {
    if (type == "accept") {
      await fetchFriends();
    }
    await fetchRequestSents();
  };

  const handleAcceptOrDeleteRequestSuccess = async (type) => {
    if (type == "accept") {
      await fetchFriends();
    }
    await fetchFriendRequests();
  };

  const handleRemoveFriendSuccess = async () => {
    await fetchFriends();
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

  const fetchFriendRequests = async () => {
    try {
      await axiosClient
        .get(`/user/${user._id}/friendRequests`)
        .then(({ data }) => {
          setFriendRequests(data);
        });
    } catch (error) {
      // Handle any errors
    }
  };
  const fetchRequestSents = async () => {
    try {
      await axiosClient
        .get(`/user/${user._id}/requestSents`)
        .then(({ data }) => {
          setRequestSents(data);
        });
    } catch (error) {
      // Handle any errors
    }
  };

  const handleSeachUser = async () => {
    let searchResponse = [];
    try {
      if (searchRequest.length > 0) {
        await axiosClient
          .post(`/user/searchUser`, {
            searchRequest: searchRequest,
          })
          .then(({ data }) => {
            searchResponse = data;
          });
      } else {
        searchResponse = [];
      }
    } catch (error) {
      console.log(error);
    }

    let searchResult = [];
    for (let i = 0; i < searchResponse.length; i++) {
      let state = "";
      if (searchResponse[i]._id == user._id) {
        state = "myself";
      }

      for (let j = 0; j < userFriends.length; j++) {
        if (searchResponse[i]._id == userFriends[j]._id) {
          state = "friend";
        }
      }

      for (let j = 0; j < friendRequests.length; j++) {
        if (searchResponse[i]._id == friendRequests[j]._id) {
          state = "friendRequest";
        }
      }

      for (let j = 0; j < requestSents.length; j++) {
        if (searchResponse[i]._id == requestSents[j]._id) {
          state = "requestSent";
        }
      }

      searchResult.push({
        _id: searchResponse[i]._id,
        username: searchResponse[i].username,
        userPicture: searchResponse[i].userPicture,
        state: state,
      });
    }

    setsearchResult(searchResult);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}>
        <View className="flex-row justify-between items-center w-full ml-3 my-3 px-10">
          <TouchableOpacity
            className=""
            onPress={() => {
              navigation.navigate("Home");
            }}>
            <Ionicons name="arrow-undo" size={40} color="black" />
          </TouchableOpacity>

          <View className="flex-1 flex-row rounded-3xl mx-3 items-center bg-gray-400 ">
            <TextInput
              className="flex-1 text-2xl py-1 px-5"
              placeholder="Add new friend"
              placeholderTextColor={"black"}
              onChangeText={(text) => {
                setsearchRequest(text);
              }}
            />
            <TouchableOpacity
              className="mx-3 p-2"
              onPress={async () => {
                await handleSeachUser();
              }}>
              <FontAwesome name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {searchResult.length > 0 && (
          <SearchResutl
            searchResult={searchResult}
            user={user}
            onUpdate={async (type) => {
              // console.log(type + " update");
              switch (type) {
                case "remove":
                  await handleRemoveFriendSuccess();
                  break;
                case "add":
                  await handleAddOrCancelSuccess();
                  break;
                case "cancel":
                  await handleAddOrCancelSuccess();
                  break;
                case "accept":
                  await handleAcceptOrDeleteRequestSuccess(type);
                  break;
                case "delete":
                  await handleAcceptOrDeleteRequestSuccess(type);
                  break;
                default:
                  break;
              }
            }}
          />
        )}
        <ListWidget
          user={user}
          data={userFriends}
          state={"friend"}
          onUpdate={handleRemoveFriendSuccess}
        />
        <ListWidget
          user={user}
          data={friendRequests}
          state={"friendRequest"}
          onUpdate={handleAcceptOrDeleteRequestSuccess}
        />

        <ListWidget
          user={user}
          data={requestSents}
          state={"requestSent"}
          onUpdate={handleAddOrCancelSuccess}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendScreen;
