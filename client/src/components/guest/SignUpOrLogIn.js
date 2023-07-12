import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, Feather } from "@expo/vector-icons";

import axiosClient from "../../utils/axios-client.js";
import Loading from "../Loading";
import { setLogin } from "../../state";

const GENDER = ["male", "female", "others"];

const SignUpOrLogIn = ({ goBack, phone, phoneExist }) => {
  const dispatch = useDispatch();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [info, setInfo] = useState("");
  const signupSuccess = useRef(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleLogin = async () => {
    try {
      setIsloading(true);

      if (phoneExist == false) {
        await axiosClient
          .post("/auth/signup", {
            password: password,
            username: userName,
            phoneNumber: phone,
            gender: gender,
            currentLocation: {},
          })
          .then(({ data }) => {
            if (data?.message == "User created successfully") {
              setInfo("created successfully");
              signupSuccess.current = true;
            }
          })
          .catch((error) => {
            console.log("Error creating user:", error.message);
          });
      }

      if ((!phoneExist && signupSuccess) || phoneExist) {
        await axiosClient
          .post("/auth/login", {
            phoneNumber: phone,
            password: password,
          })
          .then(async ({ data }) => {
            if (data?.message == "Login successfully") {
              const userjson = JSON.stringify(data.user);
              await AsyncStorage.setItem("CURRENT_USER", userjson);
              await AsyncStorage.setItem("ACCESS_TOKEN", data.token);

              const token2 = await AsyncStorage.getItem("ACCESS_TOKEN");

              dispatch(setLogin({ token: token2, user: data.user }));

              navigation.navigate("Home");
            } else {
              setInfo(data?.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (error) {}

    setIsloading(false);
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const navigation = useNavigation();

  const [isloading, setIsloading] = useState(false);

  return (
    <View className="flex-1 flex-col w-full items-center justify-center">
      {/* back button */}
      <TouchableOpacity
        className="absolute left-5 top-20 z-10 "
        onPress={goBack}>
        <Entypo name="back" size={30} color="#551A8B" />
      </TouchableOpacity>

      {/* infomation place */}
      {info && (
        <Text
          className={`text-start ${
            info == "created successfully" ? "text-green-500" : "text-red-500"
          } `}>
          {info}
        </Text>
      )}

      {/* form */}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : undefined}
        className="flex-col items-center justify-center w-full h-fit py-5  px-3 rounded-3xl">
        <Text
          className="text-3xl font-bold mb-5 "
          style={{
            color: "#C71585",
          }}>
          {phone}
        </Text>

        {/* username */}
        {!phoneExist && (
          <KeyboardAvoidingView className="flex-row justify-between w-full rounded-full bg-gray-900 m-5 p-5">
            <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
              Username
            </Text>
            <TextInput
              textAlign="center"
              onChangeText={(text) => {
                setUserName(text);
              }}
              className="text-3xl w-full"
              style={{
                color: "#C71585",
              }}
            />
          </KeyboardAvoidingView>
        )}

        {/* password */}
        <KeyboardAvoidingView className="flex-row justify-between w-full rounded-full bg-gray-900 m-5 py-5 px-5">
          <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
            Password
          </Text>
          <TextInput
            textAlign="center"
            secureTextEntry={passwordVisibility}
            onChangeText={(text) => setPassword(text)}
            className="text-3xl  flex-1"
            style={{
              color: "#C71585",
            }}
          />
          <Pressable
            onPress={handlePasswordVisibility}
            className="items-center justify-center">
            {rightIcon == "eye" ? (
              <Feather name="eye-off" size={30} color="#C71585" />
            ) : (
              <Feather name="eye" size={30} color="#C71585" />
            )}
          </Pressable>
        </KeyboardAvoidingView>

        {/* gender */}
        {!phoneExist && (
          <View className="flex-row justify-between w-full rounded-full bg-gray-900 m-5 py-5 px-5">
            <Text className="absolute -top-5 left-6 z-10 text-purple-800 font-bold text-3xl">
              Gender
            </Text>
            <View className="text-2xl text-white flex-row justify-between items-center w-full">
              {GENDER.map((g) => (
                <TouchableOpacity
                  key={g}
                  className="px-5 py-2 rounded-3xl bg-black border-4 mx-1"
                  onPress={() => {
                    setGender(g);
                  }}
                  style={{
                    borderColor: `${gender == g ? "#C71585" : "#8B7B8B"}`,
                  }}>
                  <Text className="text-xl text-white">{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* submit button */}
        <TouchableOpacity
          className="items-center justify-center rounded-2xl mt-2 mb-16 bg-purple-800 py-2 px-4 max-h-12"
          onPress={handleLogin}>
          {!isloading ? (
            phoneExist ? (
              <Text className="text-2xl">Login</Text>
            ) : (
              <Text className="text-2xl">Register</Text>
            )
          ) : (
            <Loading color={"#DDC488"} size={30} />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpOrLogIn;
