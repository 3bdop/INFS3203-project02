import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image, Input, Button, Card, Divider } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
import { signInWithEmailAndPassword } from "firebase/auth";
import Zocial from "react-native-vector-icons/Zocial";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { auth } from "./config";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import React from "react";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signedIn, setSignedIn] = useState();
  const [incorrect, setIncorrectLog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setIncorrectLog(false);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in");
        setSignedIn(true);
        navigation.replace("Feed", { email: email });
      })
      .catch((error) => {
        console.log(error.message);
        setSignedIn(false);
        setIncorrectLog(true);
        setIsLoading(false);
      });
  };
  return (
    <LinearGradient
      colors={["#f0f3fa", "#d5deef", "#b1c9ef", "#8aaee0", "#638ecb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.topHeading}>Log in</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: screenHeight * 0.08,
          }}
        >
          <Input
            autoCapitalize="none"
            value={email}
            onChangeText={(txt) => setEmail(txt)}
            placeholder="example@gmail.com"
            label="Email Address"
            rightIcon={
              <Zocial
                name="email"
                size={24}
                color={!incorrect ? "black" : "red"}
              />
            }
            labelStyle={{
              color: "black",
              paddingBottom: screenWidth * 0.03,
              fontSize: 17,
              fontWeight: "400",
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
            containerStyle={{
              paddingHorizontal: screenWidth * 0.02,
              width: screenWidth * 0.9,
            }}
            keyboardType="email-address"
          />

          <Input
            autoCapitalize="none"
            value={password}
            onChangeText={(txt) => setPassword(txt)}
            placeholder="************"
            label="Password"
            secureTextEntry={true}
            rightIcon={
              <MaterialIcons
                name="password"
                size={24}
                color={!incorrect ? "black" : "red"}
              />
            }
            labelStyle={{
              color: "black",
              paddingBottom: screenWidth * 0.03,
              fontSize: 17,
              fontWeight: "400",
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
            containerStyle={{
              paddingHorizontal: screenWidth * 0.02,
              width: screenWidth * 0.9,
            }}
          />
        </View>
        {incorrect ? (
          <Text style={{ marginLeft: 30, color: "red", fontWeight: "bold" }}>
            Incorrect Email or Password
          </Text>
        ) : null}
        <TouchableOpacity
          style={{ alignItems: "flex-end", paddingRight: screenWidth * 0.08 }}
        >
          <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onPress={handleLogin}
            title={
              isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Log In"
              )
            }
            titleStyle={{ fontWeight: "bold" }}
            buttonStyle={{
              backgroundColor: "#6B8BE0",
              paddingVertical: screenWidth * 0.045,
            }}
            containerStyle={{
              width: screenWidth * 0.75,
              borderRadius: 10,
              // marginHorizontal: -1,
              marginVertical: screenWidth * 0.05,
            }}
          />
          {/* Show ActivityIndicator when isLoading is true */}
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} color="black" width="1" />
            <Text style={styles.dividerText}>Or Login With</Text>
            <Divider style={styles.divider} color="black" width="1" />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: screenHeight * 0.02,
            }}
          >
            <TouchableOpacity style={styles.boxes}>
              <FontAwesome name="facebook-f" size={24} color={"blue"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <Zocial name="gmail" size={24} color={"red"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxes}>
              <FontAwesome name="apple" size={24} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: screenHeight * 0.03,
          }}
        >
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")} 
          >
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff'
  },
  topHeading: {
    fontWeight: "bold",
    fontSize: screenWidth * 0.04,
    marginTop: screenHeight * 0.1,
    fontSize: screenWidth * 0.09,
    marginLeft: screenWidth * 0.07,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 8,
    textAlign: "center",
    color: "black",
    fontSize: 14,
  },

  boxes: {
    width: 80,
    height: 60,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
