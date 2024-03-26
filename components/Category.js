import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import { Image, Input, Button, Card, Divider, SearchBar } from "@rneui/themed";

import React from "react";
import { Tab, Text, TabView } from "@rneui/themed";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "./config";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Category = ({ active, setActive }) => {
  return (
    <View style={[styles.outerCategory, { backgroundColor: "snow" }]}>
      {/* to change the categoryy bg */}
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: screenWidth * 0.07, fontWeight: "500" }}>
          Categories
        </Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => setActive("dog")}
          style={[
            styles.animalCategoryCard,
            {
              backgroundColor: active == "dog" ? "#6B8BE0" : "snow",
              flexDirection: "row",
            },
          ]}
        >
          <Image
            source={require("../assets/dog2.jpeg")}
            style={styles.animalImageCard}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={[
                styles.animalCardFontSize,
                { color: active == "dog" ? "white" : "grey" },
              ]}
            >
              Dogs
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActive("cat")}
          style={[
            styles.animalCategoryCard,
            {
              backgroundColor: active == "cat" ? "#6B8BE0" : "snow",
              flexDirection: "row",
            },
          ]}
        >
          <Image
            source={require("../assets/pink.jpg")}
            style={styles.animalImageCard}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={[
                styles.animalCardFontSize,
                { color: active == "cat" ? "white" : "grey" },
              ]}
            >
              Cats
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActive("bird")}
          style={[
            styles.animalCategoryCard,
            {
              backgroundColor: active == "bird" ? "#6B8BE0" : "snow",
              flexDirection: "row",
            },
          ]}
        >
          <Image
            source={require("../assets/bird_category.jpeg")}
            style={styles.animalImageCard}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={[
                styles.animalCardFontSize,
                { color: active == "bird" ? "white" : "grey" },
              ]}
            >
              Birds
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActive("")}
          style={[
            styles.animalCategoryCard,
            {
              backgroundColor: active == 3 ? "#6B8BE0" : "snow",
              flexDirection: "row",
            },
          ]}
        ></TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Styles specific to this component

const styles = StyleSheet.create({
  outerCategory: {
    width: screenWidth * 0.9,
    backgroundColor: "white",
    alignSelf: "center",
    margin: 5,
  },
  animalCategoryCard: {
    width: screenWidth * 0.35,
    height: screenWidth * 0.12,
    backgroundColor: "grey",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 15,
    alignItems: "center",
  },
  animalImageCard: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: 10,
    marginLeft: "9%",
  },
  animalCardFontSize: {
    fontSize: screenWidth * 0.05,
    marginRight: "20%",
  },
});

export default Category;
