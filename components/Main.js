import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Image, Input, Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import React from "react";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../assets/bones.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.2,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Image source={require("../assets/catMain.png")} style={styles.logo} />
      </View>
      <View
        style={{
          zIndex: 2,
          width: "170%",
          height: "50%",
          backgroundColor: "#EBEDFE",
          borderTopLeftRadius: screenWidth,
          borderTopRightRadius: screenWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <Text style={styles.boldText}>Explore the app</Text>
            <Text style={styles.innerText}>
              Discover your new best friend with our easy-to-use pet adoption
              app.
            </Text>
          </View>
          <View>
            <Button
              onPress={() => navigation.replace("LoginScreen")}
              title="Sign In"
              titleStyle={{ fontWeight: "bold" }}
              buttonStyle={{
                backgroundColor: "#6B8BE0",
                paddingVertical: screenWidth * 0.045,
              }}
              containerStyle={{
                width: screenWidth * 0.75,
                borderRadius: 10,
                marginVertical: screenWidth * 0.05,
              }}
            />
          </View>

          <View>
            <Button
              title="Create Account"
              titleStyle={{
                color: "black",
                fontWeight: "bold",
              }}
              buttonStyle={{
                backgroundColor: "snow",
                paddingVertical: screenWidth * 0.045,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
              }}
              containerStyle={{
                width: screenWidth * 0.75,
              }}
              onPress={() => navigation.navigate("RegisterScreen")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B8BE0",
  },
  logo: {
    width: screenWidth,
    height: screenWidth * 0.9,
    marginTop: "39%",
  },
  boldText: {
    fontSize: screenWidth * 0.09,
    fontWeight: "bold",
    margin: screenWidth * 0.05,
    textAlign: "center",
  },
  innerText: {
    textAlign: "center",
    fontSize: screenWidth * 0.04,
    padding: screenWidth * 0.03,
    paddingHorizontal: screenWidth * 0.4,
  },
});
