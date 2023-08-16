import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signInFirebase } from "../../firebaseConfig";

import styles from "./styles";

export default function LoginScreen({ setIsSignedIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const fetchData = async (userToken) => {
    const userInfoResponse = await fetch(
      `https://smart-pv.herokuapp.com/api/user/token/${userToken}`,
      { method: "GET" }
    );
    const userInfo = await userInfoResponse.json();

    const adminInfoResponse = await fetch(
      `https://smart-pv.herokuapp.com/api/admin/token/${userInfo.adminId}`,
      { method: "GET" }
    );
    const adminInfo = await adminInfoResponse.json();

    global.farmId = adminInfo.farmId;
    global.userName = adminInfo.name;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={"#1C64BB"} />
      <View
        style={{
          height: "50%",
          width: 130,
          justifyContent: "flex-end",
        }}
      >
        <Image
          source={require("../../../assets/green_energy.png")}
          style={[styles.appLogo]}
        />
        <View style={styles.appName}>
          <Text style={{ fontWeight: "500", color: "gray" }}>SMART-PV</Text>
        </View>
      </View>
      <View
        style={{
          height: "10%",
          width: "100%",
        }}
      />
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.inputField}
          placeholder="Login"
          onTouchStart={() => {
            setIncorrectCredentials(false);
          }}
          onChangeText={(loginInput) => {
            setLogin(loginInput);
          }}
        ></TextInput>
        <View style={{ padding: 2 }} />
        <TextInput
          secureTextEntry={true}
          style={styles.inputField}
          placeholder="Password"
          onTouchStart={() => {
            setIncorrectCredentials(false);
          }}
          onChangeText={(passwordInput) => {
            setPassword(passwordInput);
          }}
        ></TextInput>
      </View>
      <View style={styles.incorrectAuth}>
        {incorrectCredentials && (
          <Text style={{ color: "#FF8585" }}>
            Incorrect credentials. Try again.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.loginButton]}
        onPress={async () => {
          try {
            const { user } = await signInFirebase(login, password);
            await fetchData(user.uid);
            setIncorrectCredentials(false);
            setIsSignedIn(true);
          } catch (errorMessage) {
            setIncorrectCredentials(true);
            console.log(errorMessage);
          }
        }}
      >
        <LinearGradient
          colors={["#227BEA", "#459FF0"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.loginButton, { marginTop: 0, width: "100%" }]}
        >
          <Text style={{ color: "white" }}>LOG IN</Text>
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
