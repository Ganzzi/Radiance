import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { CheckPhone, SignUpOrLogIn } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [phoneExist, setPhoneExist] = useState(false);
  const [isCheckPhone, setIsCheckPhone] = useState(true);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  const { token, user } = useSelector((state) => state.state);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.navigate("Home");
    }
  }, [token]);

  const setPhoneNumber = (ph) => {
    setPhone(ph);
    setIsCheckPhone(false);
  };

  const handleGo = () => {
    setIsCheckPhone(!isCheckPhone);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center space-x-1">
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
