import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import Loading from "../Loading";
import axiosClient from "../../axios-client";
import { useDispatch } from "react-redux";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const CheckPhone = ({
  phone,
  goForward,
  setPhone,
  setPhoneExist,
  value,
  setValue,
  formattedValue,
  setFormattedValue,
}) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState("");

  const phoneInput = useRef(null);

  return (
    <View className="flex-1 w-full flex-col h-1/3 items-center justify-center ">
      {phone && (
        <TouchableOpacity
          className="absolute right-5 top-20 z-10 "
          onPress={goForward}>
          <Entypo name="forward" size={30} color="black" />
        </TouchableOpacity>
      )}
      <SafeAreaView className="flex-1 flex-col items-center justify-center space-y-5">
        {info && <Text className="text-start text-red-500">{info}</Text>}

        <View className="">
          <PhoneInput
            textInputStyle={{
              color: "#222222",
              fontWeight: "600",
              textDecorationStyle: "dashed",
              letterSpacing: 3,
              fontSize: 20,
            }}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="VN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
        </View>

        <TouchableOpacity
          className=" bg-green-400 rounded-xl px-4 py-2 justify-center items-center"
          disabled={!phoneInput}
          onPress={() => {
            const checkValid = phoneInput.current?.isValidNumber(value);

            console.log(phoneInput.current.isValidNumber(value));

            if (checkValid) {
              axiosClient
                .post("/auth/checkphone", {
                  phoneNumber: formattedValue,
                })
                .then(async ({ data }) => {
                  setPhone(data?.phone);
                  if (data?.message == "user exist") {
                    setPhoneExist(true);
                  } else if (data?.message == "user not exist") {
                    setPhoneExist(false);
                  }
                })
                .catch((e) => console.log("dmm" + e.message));
            }
          }}>
          {false ? (
            <Loading color={"#000000"} />
          ) : (
            <MaterialCommunityIcons name="check-bold" size={30} color="black" />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default CheckPhone;
