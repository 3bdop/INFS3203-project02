import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";

import { Image, Button, Card, Divider, SearchBar } from "@rneui/themed";
// import RNFetchBlob from 'react-native-fetch-blob';
import { doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "./config";
import React, { useEffect, useState } from "react";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function PetDetails({ navigation, route }) {
  useEffect(() =>
    navigation.setOptions(
      {
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#DDDDDD7E",
              width: screenWidth * 0.08,
              height: screenWidth * 0.08,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="left" size={25} />
          </TouchableOpacity>
        ),

      },
      []
    )
  );

  const { item } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const adopt = async () => {
    setIsLoading(true)
    const petDoc = doc(db, "pets", item.id);
    await deleteDoc(petDoc);
    Alert.alert(`Thank you for adopting ${item.name} ❤`,
    "",
    { text: "OK", onPress:() => console.log("OK Pressed"),});
    setIsLoading(false)
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: screenWidth,
          maxWidth: screenWidth,
          height: "50%",
          backgroundColor: "#C9CEF4",
          borderBottomLeftRadius: screenWidth,
          borderBottomRightRadius: screenWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            marginRight: "5%",
            // marginHorizontal: '10%',
            width: screenWidth * 0.7,
            height: screenWidth * 0.7,
            borderRadius: 30,
          }}
          source={{ uri: item.image }}
        />
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          marginLeft: screenWidth * 0.05,
          height: "8%",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: screenWidth * 0.06 }}>
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={[styles.cardMiddle, { backgroundColor: "#f8d7b7" }]}>
          <Text style={styles.cardText}>  
            {item.age}
          </Text>
          <Text style={{ color: "grey" }}>Age</Text>
        </View>
        <View
          style={[
            styles.cardMiddle,
            { backgroundColor: "#f2b6f6" },
          ]}
        >
          <Text style={styles.cardText}>
            {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)}
          </Text>
          <Text style={{ color: "grey" }}>Gender</Text>
        </View>
        <View style={[styles.cardMiddle, { backgroundColor: "#f7b6be" }]}>
          <Text style={styles.cardText}>
            {item.weight.includes("kg") ? item.weight : item.weight + "kg"}
          </Text>
          <Text style={{ color: "grey" }}>Weight</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          marginLeft: screenWidth * 0.05,
          height: "15%",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: screenWidth * 0.06,
            height: "40%",
          }}
        >
          About
        </Text>
        <Text style={{ color: "grey", fontSize: screenWidth * 0.04 }}>
          {item.description}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "10%",
          marginTop: "13%",
        }}
      >
        <Button
          onPress={adopt}
          title={
            isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Adopt me"
            )
          }
          titleStyle={{ fontWeight: "bold" }}
          buttonStyle={{
            backgroundColor: "#6B8BE0",
            paddingVertical: screenWidth * 0.045,
          }}
          containerStyle={{
            width: screenWidth * 0.6,
            borderRadius: 20,
            // marginHorizontal: -1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#fff",
    // backgroundColor: "#fff",
  },
  cardMiddle: {
    height: screenWidth * 0.19,
    width: screenWidth * 0.3,
    borderRadius: screenWidth * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontWeight: "bold",
  },
});

