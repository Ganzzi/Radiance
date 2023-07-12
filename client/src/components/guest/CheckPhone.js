import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from "react-native-confirmation-code-field";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { useDispatch } from "react-redux";

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from "./styles";
import Loading from "../Loading";
import axiosClient from "../../utils/axios-client.js";

const { Value, Text: AnimatedText, View: AnimatedView } = Animated;

const windowWidth = Dimensions.get("window").width;

const CELL_COUNT = 6;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

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
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ref = useBlurOnFulfill({ verifyingCode, cellCount: CELL_COUNT });

  const handleSendVerifyingCode = async () => {
    setIsLoading(true);

    await axiosClient
      .post("/auth/checkphone", {
        phoneNumber: formattedValue,
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data?.message == "user exist") {
            setPhone(res.data?.phone);
            setPhoneExist(true);
          } else if (res.data?.message == "user not exist") {
            setPhone(res.data?.phone);
            setPhoneExist(false);
          } else {
            setInfo(res.data.message);
            setIsLoading(false);
            setIsVerifyingCode(true);
          }
        }
      });
    setInfo("");
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    await axiosClient
      .post("/auth/verifycode", {
        phoneNumber: formattedValue,
        code: verifyingCode,
      })
      .then(async ({ data }) => {
        setIsLoading(false);
        setPhone(data?.phone);

        if (data?.message == "user exist") {
          setPhoneExist(true);
        } else if (data?.message == "user not exist") {
          setPhoneExist(false);
        }
      });
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedView
        key={index}
        style={[styles.cell, animatedCellStyle]}
        // onLayout={getCellOnLayoutHandler(index)}
      >
        <Text style={styles.cellText}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      </AnimatedView>
    );
  };

  return (
    <View className="flex-1 w-full flex-col h-1/3 items-center justify-center">
      {/* forward button */}
      {phone && (
        <TouchableOpacity
          className="absolute right-5 top-20 z-10 "
          onPress={goForward}>
          <Entypo name="forward" size={30} color="black" />
        </TouchableOpacity>
      )}

      {/* main content */}
      <SafeAreaView className="flex-1 flex-col items-center justify-center space-y-5 w-full">
        {/* Info place */}
        {info && (
          <Text
            className="text-start"
            style={{
              color: "#C71585",
            }}>
            {info}
          </Text>
        )}

        {/* display phone or code confirmation form  */}
        {!isVerifyingCode ? (
          // Enter phone
          <KeyboardAvoidingView
            className="w-full items-center mb-10"
            behavior="padding">
            <Text
              className="absolute -top-5 left-24 z-10 font-bold text-xl"
              style={{
                color: "#C71585",
              }}>
              Phone Number
            </Text>
            <TouchableOpacity
              className={`rounded-3xl  justify-center items-center absolute  z-10  ${
                phoneInput.current?.isValidNumber(value)
                  ? "bg-red-400 px-3 py-3 top-3 right-20"
                  : "bg-gray-400 px-1 py-1 top-5 right-20"
              } `}
              disabled={!phoneInput.current?.isValidNumber(value) || isLoading}
              onPress={handleSendVerifyingCode}>
              {isLoading ? (
                <Loading color={"#DDC488"} size={24} />
              ) : (
                <MaterialCommunityIcons
                  name="check-bold"
                  size={24}
                  color="black"
                />
              )}
            </TouchableOpacity>
            <PhoneInput
              placeholder=" "
              textContainerStyle={{
                marginRight: windowWidth / 5.5,
                borderRadius: windowWidth / 12,
                backgroundColor: "#333333",
                borderColor: "#C71585",
                borderWidth: 2,
                paddingHorizontal: 10,
              }}
              textInputStyle={{
                color: "#C71585",
                letterSpacing: 1,
                fontSize: 22,
              }}
              codeTextStyle={{
                color: "#AB82FF",
                alignItems: "center",
                fontSize: 15,
              }}
              containerStyle={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "black",
                paddingVertical: 5,
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              countryPickerButtonStyle={{
                width: windowWidth / 7.5,
                height: 40,
                backgroundColor: "#AB82FF",
                borderRadius: 15,
                marginHorizontal: (windowWidth / 5.5 - windowWidth / 7.5) / 2,
              }}
              ref={phoneInput}
              defaultCode="VN"
              layout="first"
              onChangeText={(text) => {
                setIsLoading(false);
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              autoFocus
            />
          </KeyboardAvoidingView>
        ) : (
          // Enter code
          <KeyboardAvoidingView
            className="w-full items-center"
            behavior="padding">
            <View>
              <Text style={styles.subTitle}>
                Please enter the verification code{"\n"}
                we send to {formattedValue}
              </Text>
              <CodeField
                ref={ref}
                value={verifyingCode}
                onChangeText={setVerifyingCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </View>
            <TouchableOpacity
              className={` ${
                verifyingCode.length == 6 ? "bg-blue-600" : "bg-gray-400"
              } rounded-3xl px-8 py-4 justify-center items-center my-5`}
              disabled={verifyingCode.length != 6 || isLoading}
              onPress={handleVerifyCode}>
              {isLoading ? (
                <Loading color={"#000000"} />
              ) : (
                <Text className="text-2xl text-bold text-white">Verify</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsVerifyingCode(false);
                setInfo("");
              }}
              className="mb-10">
              <Text className="text-xl text-bold text-blue-400">
                Or change phone number
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}

        {/* {isVerifyingCode && (
          <>
            
          </>
        )} */}
      </SafeAreaView>
    </View>
  );
};

export default CheckPhone;
