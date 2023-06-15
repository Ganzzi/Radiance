import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import axiosClient from "../../axios-client";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, Feather } from "@expo/vector-icons";

const SignUpOrLogIn = ({ goBack, phone, phoneExist }) => {
  const { user } = useSelector((state) => state.state);
  const dispatch = useDispatch();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [info, setInfo] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

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
              setSignupSuccess(true);
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
              dispatch(setLogin({ token: data.token, user: data.user }));

              const userjson = JSON.stringify(data.user);
              await AsyncStorage.setItem("CURRENT_USER", userjson);
              await AsyncStorage.setItem("ACCESS_TOKEN", data.token);

              navigation.navigate("Home");
            } else {
              setInfo(data?.message);
              console.log(data?.message);
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
      <TouchableOpacity
        className="absolute left-5 top-20 z-10 "
        onPress={goBack}>
        <Entypo name="back" size={30} color="black" />
      </TouchableOpacity>

      {info && (
        <Text
          className={`text-start ${
            info == "created successfully" ? "text-green-500" : "text-red-500"
          } `}>
          {info}
        </Text>
      )}
      <View className="flex-col items-center justify-center bg-blue-400 max-h-fit py-5  px-3 rounded-3xl">
        <Text className="text-3xl text-black font-bold mb-5 ">{phone}</Text>

        {!phoneExist && (
          <View className="flex-row w-4/5 rounded-2xl bg-gray-200 px-2 py-1 my-1">
            <TextInput
              className="flex-1 text-3xl"
              placeholder="Username"
              onChangeText={(text) => {
                setUserName(text);
              }}
            />
          </View>
        )}

        <View className="flex-row w-4/5 rounded-2xl bg-gray-200 px-2 py-1 my-1">
          <TextInput
            className="flex-1 text-3xl"
            secureTextEntry={passwordVisibility}
            textContentType="password"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable
            onPress={handlePasswordVisibility}
            className="items-center justify-center">
            {rightIcon == "eye" ? (
              <Feather name="eye-off" size={30} color="black" />
            ) : (
              <Feather name="eye" size={30} color="black" />
            )}
          </Pressable>
        </View>

        {!phoneExist && (
          <SelectDropdown
            data={["male", "female", "others"]}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setGender(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        )}

        <TouchableOpacity
          className=" items-center justify-center rounded-2xl mt-2 bg-green-500 py-2 px-4 max-h-12"
          onPress={handleLogin}>
          {!isloading ? (
            phoneExist ? (
              <Text className="text-2xl">Login</Text>
            ) : (
              <Text className="text-2xl">Register</Text>
            )
          ) : (
            <Loading color={"#000000"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpOrLogIn;
