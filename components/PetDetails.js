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
  const [isLoading, setIsLoading] = useState(false)
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
          source={{ uri: "" }}
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
            
          </Text>
          <Text style={{ color: "grey" }}>Gender</Text>
        </View>
        <View style={[styles.cardMiddle, { backgroundColor: "#f7b6be" }]}>
          <Text style={styles.cardText}>
            
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