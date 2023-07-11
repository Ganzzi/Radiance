import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import axiosClient from "../../utils/axios-client.js";
import { formatDateTime, formatTime } from "../../utils";
import { REACTIONS } from "../../constants";
import SwiperFlatList from "react-native-swiper-flatlist";
import Pagination from "./Pagination";
import socket from "../../utils/socket";
import { useNavigation } from "@react-navigation/native";

const PictureCard = ({ user, width, item, data, setData }) => {
  const navigation = useNavigation();
  const timepassed = formatTime(item.createdAt);

  const [isUpdatingDescription, setIsUpdatingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  const [showReactions, setShowReactions] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [messageText, setMessageText] = useState("");

  const [behaviour, setBehaviour] = useState("react");

  const [reactionData, setReactionData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const handleReceiveReaction = async (data) => {
      if (data.pictureId == item._id) {
        await getReactions();
      }
    };
    const handleReceiveComment = async (data) => {
      if (data.pictureId == item._id) {
        // await getComments();

        setCommentData([data.newComment, ...commentData]);
      }
    };

    getReactions();
    getComments();

    socket.on("recieve-reaction", handleReceiveReaction);
    socket.on("recieve-comment", handleReceiveComment);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("recieve-reaction", handleReceiveReaction);
      socket.off("recieve-comment", handleReceiveComment);
    };
  }, [socket, item]);

  const getComments = async () => {
    await axiosClient.get(`/pictures/${item._id}/comments`).then(({ data }) => {
      setCommentData(data?.comments.reverse());
    });
  };

  const getReactions = async () => {
    await axiosClient
      .get(`/pictures/${item._id}/reactions`)
      .then(({ data }) => {
        setReactionData(data.reactions.reverse());
      });
  };

  const handleUpdateDescription = async () => {
    try {
      await axiosClient
        .patch(`/pictures/${item._id}/editDescribtion`, {
          description: newDescription,
        })
        .then((response) => {
          if (response.status == 200) {
            const updatedPicture = response.data.updatedPicture;
            setData((prevPictures) =>
              prevPictures.map((picture) => {
                if (picture._id === updatedPicture._id) {
                  return updatedPicture;
                } else {
                  return picture;
                }
              })
            );

            socket.emit("update-picture", updatedPicture);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateComment = async () => {
    await axiosClient
      .post(`/pictures/${item._id}/comments`, {
        text: commentText,
        commenterId: user._id,
      })
      .then(({ data }) => {
        setCommentData([data.comment, ...commentData]);

        socket.emit("comment-picture", {
          from: user._id,
          to: item.takerId,
          pictureId: item._id,
          newComment: data.comment,
        });
      });
    setCommentText("");
  };

  const handleDeletePicture = async () => {
    await axiosClient
      .delete(`/pictures/${item._id}/remove`)
      .then((response) => {
        if (response.status == 200) {
          setData(data.filter((pic) => pic._id !== item._id));
          setShowShareModal(false);

          socket.emit("delete-picture", {
            from: user._id,
            pictureId: item._id,
          });
        }
      });
  };

  const handleReactPicture = async (type) => {
    await axiosClient
      .post(`/pictures/${item._id}/reactions`, {
        type: type,
        reactor: user._id,
      })
      .then(async (response) => {
        const newReaction = response.data.newReaction;

        if (response.status == 201) {
          let found = false;
          const newReactionData = reactionData.map((r) => {
            if (r.userId == newReaction.userId) {
              found = true;
              return newReaction;
            }
            return r;
          });

          found
            ? setReactionData(newReactionData)
            : setReactionData([newReaction, ...reactionData]);
        }

        // await getReactions();

        socket.emit("react-picture", {
          from: user._id,
          to: item.takerId,
          pictureId: item._id,
          newReaction: newReaction,
        });
      });
  };

  const handleCreateMessage = async () => {
    await axiosClient.post(
      `/messages/${user._id}/${item.takerId}/createMessage`,
      {
        type: "picture",
        content: {
          pictureUrl: item?.pictureUrl,
          text: messageText,
        },
      }
    );

    socket.emit("send-msg", {
      to: item.takerId,
      from: user._id,
      msg: {
        type: "picture",
        content: {
          pictureUrl: item?.pictureUrl,
          text: messageText,
        },
      },
    });

    setMessageText("");
    navigation.navigate("MessageRoom", {
      otherId: item.takerId,
    });
  };

  return (
    <View
      className="justify-center items-center"
      style={{
        width: width,
      }}>
      {/* Picture card */}
      <View
        className={`bg-blue-200 rounded-3xl w-fit p-2  justify-center items-center ${
          showReactions
            ? `flex-row ${
                behaviour == "react"
                  ? "mb-80"
                  : behaviour == "comment"
                  ? "mb-56"
                  : "mb-32"
              }`
            : "flex-col"
        }`}>
        {/* Image */}
        <View
          className="rounded-3xl"
          style={{
            width: (width * 3) / 5,
            height: (width * 3) / 5,
          }}>
          <Image
            source={{
              uri: item?.pictureUrl,
            }}
            className="rounded-3xl w-full h-full"
          />

          {/* description */}
          {item?.description && (
            <View className="absolute bottom-2 w-full justify-center items-center">
              {isUpdatingDescription ? (
                <View className="absolute bottom-0 flex-col space-x-2">
                  <TouchableOpacity
                    className={`bg-gray-400 rounded-3xl  px-1 ${
                      isUpdatingDescription ? "-z-10" : "z-20"
                    }`}>
                    <TextInput
                      onChangeText={(text) => {
                        setNewDescription(text);
                      }}
                      maxLength={20}
                      autoFocus
                      defaultValue={isUpdatingDescription && item.description}
                    />
                  </TouchableOpacity>

                  <View className="flex-row justify-center space-x-3 my-1">
                    <TouchableOpacity
                      className="bg-red-200 rounded-full
                     items-center justify-center"
                      onPress={() => {
                        setIsUpdatingDescription(false);
                      }}>
                      <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="bg-green-200 rounded-full
                     items-center justify-center"
                      onPress={async () => {
                        await handleUpdateDescription();
                        setIsUpdatingDescription(false);
                      }}>
                      <AntDesign name="check" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  className="w-fit bg-gray-200 p-1 rounded-3xl"
                  onLongPress={() => {
                    if (item.takerId == user._id) {
                      setIsUpdatingDescription(true);
                    }
                  }}>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* user name, time */}
        <TouchableOpacity
          className={`items-center justify-center flex-row space-x-2 my-0.5 ${
            showReactions && "absolute top-3 left-3"
          }`}>
          <Image
            source={{
              uri: item?.takerPicture,
            }}
            style={{ width: width / 15, height: width / 15 }}
            className="rounded-3xl"
          />
          <Text className="font-bold to-black">{item?.takerName}</Text>
          <Text>{timepassed}</Text>
        </TouchableOpacity>

        {/* react bar */}
        {!showReactions && (
          <View className="flex-row space-x-3 bg-gray-100 opacity-80 px-4 py-2 rounded-3xl  justify-center">
            {item.takerId != user._id && (
              <TouchableOpacity
                className="w-28 bg-gray-400 rounded-3xl px-2 justify-center items-start"
                onPress={() => {
                  setBehaviour("message");
                  setShowReactions(true);
                }}>
                <Text className="text-black">Message...</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="rounded-full p-1 items-center justify-center"
              onPress={async () => {
                setBehaviour("react");
                setShowReactions(true);
              }}>
              <Text className="text-purple-600 absolute z-10 font-bold text-md top-2">
                {reactionData.length}
              </Text>
              <AntDesign name="heart" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full p-1 items-center justify-center"
              onPress={async () => {
                setBehaviour("comment");
                setShowReactions(true);
              }}>
              <Text className="text-black absolute z-10 font-bold text-md top-2">
                {commentData.length}
              </Text>
              <FontAwesome5 name="comment-alt" size={30} color="purple" />
            </TouchableOpacity>
          </View>
        )}

        {/* Share button */}
        {!showReactions && item.takerId == user._id && (
          <TouchableOpacity
            className="absolute right-2 bottom-14"
            onPress={() => setShowShareModal(true)}>
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color={"black"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Reaction modal */}
      {showReactions && (
        <Modal
          visible={showReactions}
          animationType="slide"
          presentationStyle="overFullScreen"
          transparent>
          <KeyboardAvoidingView
            behavior={"padding"}
            className="flex-1 items-center justify-end "
            width={width}>
            {/* close */}
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowReactions(false)}
              className="absolute h-full w-full"
            />

            {/* content */}
            <View
              // behavior={"padding"}
              className={`mx-1 justify-start items-center ${
                behaviour == "react"
                  ? "h-96"
                  : behaviour == "comment"
                  ? "h-72"
                  : "h-48"
              } rounded-t-3xl bg-black flex-col`}
              width={width}>
              {/* flat list */}
              <View className="flex-1" width={width}>
                <SwiperFlatList
                  showPagination
                  PaginationComponent={({
                    paginationIndex,
                    scrollToIndex,
                    size,
                  }) => (
                    <Pagination
                      showMessage={item.takerId != user._id}
                      paginationIndex={paginationIndex}
                      scrollToIndex={scrollToIndex}
                      size={size}
                    />
                  )}
                  // ref={scrollRef}
                  index={
                    item.takerId != user._id
                      ? behaviour == "comment"
                        ? 2
                        : behaviour == "react"
                        ? 1
                        : 0
                      : behaviour == "comment"
                      ? 1
                      : behaviour == "react" && 0
                  }
                  className="pt-14"
                  onChangeIndex={({ index }) => {
                    setBehaviour(
                      item.takerId != user._id
                        ? index == 0
                          ? "message"
                          : index == 1
                          ? "react"
                          : "comment"
                        : index == 0
                        ? "react"
                        : "comment"
                    );
                  }}>
                  {item.takerId != user._id && (
                    <View
                      className="mt-8 h-12 flex-row justify-center px-2"
                      width={width}>
                      <View className="justify-center flex-row mx-3 bg-gray-200 flex-1 py-1 rounded-3xl ">
                        <TextInput
                          textAlign="center"
                          value={messageText}
                          placeholder="Message..."
                          className="text-2xl text-purple-500"
                          onChangeText={(text) => setMessageText(text)}
                          placeholderTextColor={"purple"}
                        />
                      </View>
                      <TouchableOpacity
                        className="px-4 flex-row justify-center items-center bg-blue-300 rounded-2xl"
                        onPress={handleCreateMessage}>
                        <Text>send</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <ScrollView
                    className=" h-full text-white flex-col"
                    width={width}>
                    <View className="w-full mt-2 flex-row flex-wrap items-center justify-center">
                      {REACTIONS.map((item) => (
                        <TouchableOpacity
                          key={item.name}
                          className="my-1 mx-3"
                          onPress={() => handleReactPicture(item.name)}>
                          <MaterialCommunityIcons
                            name={item.name}
                            size={width / 8}
                            color={"white"}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View className="w-full flex-col items-center justify-center mt-5">
                      {reactionData.length != 0 &&
                        reactionData.map((item) => (
                          <View
                            className="w-full p-2 flex-row "
                            key={item.userName}>
                            <View className="flex-row flex-1 justify-start items-center px-5">
                              {item.userImage && (
                                <Image
                                  source={{
                                    uri: item.userImage,
                                  }}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              )}
                              <View className="flex-col items-start justify-between px-1">
                                <Text className="text-xl text-white">
                                  {item.userName}
                                </Text>
                                <Text className="text-md text-white">
                                  {formatTime(item.createdAt)}
                                </Text>
                              </View>
                            </View>
                            <View className="px-5">
                              <MaterialCommunityIcons
                                name={item.type}
                                size={40}
                                color={"white"}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
                  </ScrollView>

                  <View width={width}>
                    {item.takerId != user._id && (
                      <View
                        className="mt-3 flex-row justify-center px-2"
                        width={width}>
                        <View className="justify-center flex-row flex-1 mx-3 bg-gray-200 py-1 rounded-3xl">
                          <TextInput
                            textAlign="center"
                            value={commentText}
                            placeholder="Comment..."
                            className="flex-1 rounded-3xl text-xl px-2 py-1 text-purple-500"
                            onChangeText={(text) => setCommentText(text)}
                            placeholderTextColor={"purple"}
                          />
                        </View>
                        <TouchableOpacity
                          className="px-4 flex-row justify-center items-center bg-blue-300 rounded-2xl "
                          onPress={handleCreateComment}>
                          <Text>send</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    <ScrollView className="px-5 py-1" width={width}>
                      {/* each comment */}
                      {commentData?.length != 0 ? (
                        commentData.map((cmt) => (
                          <View
                            className="flex-row rounded-3xl my-1 justify-start"
                            key={cmt._id}>
                            <View className="w-full flex-row items-start">
                              {cmt.commentorImage && (
                                <Image
                                  source={{
                                    uri: cmt.commentorImage,
                                  }}
                                  style={{ width: 45, height: 45 }}
                                  className="rounded-full mt-2"
                                />
                              )}

                              <View className="flex-1 flex-col items-start justify-start mx-2">
                                <View className="flex-row justify-start space-x-5">
                                  <Text>{cmt.commentorName}</Text>
                                  <Text>{formatDateTime(cmt.updatedAt)}</Text>
                                </View>
                                <View className="w-fit bg-gray-300 rounded-3xl py-2 px-2 ">
                                  <Text>{cmt.text}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))
                      ) : (
                        <View className="mt-3 justify-center items-center">
                          <Text className="text-purple-500 text-2xl">
                            No Comment Yet
                          </Text>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                </SwiperFlatList>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {/* delete modal */}
      {showShareModal && (
        <Modal
          visible={true}
          animationType="slide"
          presentationStyle="overFullScreen"
          transparent>
          <View className="flex-1 items-center justify-center ">
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setShowShareModal(false);
              }}
              className="absolute h-full w-full"
            />

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              className="px-3 absolute bottom-0 w-full h-72  bg-slate-400">
              <TouchableOpacity onPress={handleDeletePicture}>
                <MaterialCommunityIcons
                  name="trash-can"
                  size={40}
                  color="red"
                />
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PictureCard;
