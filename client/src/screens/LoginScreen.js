import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CheckPhone, SignUpOrLogIn } from "../components";
import { setLogin } from "../state";

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [phoneExist, setPhoneExist] = useState(false);
  const [isCheckPhone, setIsCheckPhone] = useState(true);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const { token, user } = useSelector((state) => state.state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggin = () => {
      if (token) {
        setFormattedValue("");
        setValue("");
        setPhoneExist(false);
        setIsCheckPhone(true);
        navigation.navigate("Home");
      }
    };

    checkLoggin();
  }, [token]);

  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("ACCESS_TOKEN");
        const userjson = await AsyncStorage.getItem("CURRENT_USER");
        const user = JSON.parse(userjson);

        if (token && user) {
          dispatch(setLogin({ token: token, user: user }));
        } else {
          // navigation.navigate("Login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    retrieveUserData();
  }, [token]);

  const setPhoneNumber = (ph) => {
    setPhone(ph);
    setIsCheckPhone(false);
  };

  const handleGo = () => {
    setIsCheckPhone(!isCheckPhone);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      {isCheckPhone ? (
        <CheckPhone
          value={value}
          setValue={(value) => setValue(value)}
          formattedValue={formattedValue}
          setFormattedValue={(value) => setFormattedValue(value)}
          phone={phone}
          goForward={handleGo}
          setPhone={setPhoneNumber}
          setPhoneExist={(phoneExist) => {
            setPhoneExist(phoneExist);
          }}></CheckPhone>
      ) : (
        <SignUpOrLogIn
          goBack={handleGo}
          phone={phone}
          phoneExist={phoneExist}></SignUpOrLogIn>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
