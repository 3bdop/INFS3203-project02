import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Image, Input, Button, Card, Divider, SearchBar } from "@rneui/themed";
// import RNFetchBlob from 'react-native-fetch-blob';

import React, { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "./config";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default async function PetDetails({ navigation, route }) {
  useEffect(() =>
    navigation.setOptions(
      {
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={25} />
          </TouchableOpacity>
        ),
      },
      []
    )
  );
  const { item } = route.params;
  /// This is the reciving object sample ibside the  const {item} = route.params; below
  // {"age": "sas", "category": "bird", "description": "sas", "id": "By3mSiouMAbyAjfXQ0G5",
  //"image": "https://firebasestorage.googleapis.com/v0/b/project-26815.appspot.com/o/pet_images%2FBy3mSiouMAbyAjfXQ0G5?alt=media&token=//0b843c3e-9c3c-428b-98fc-768f1895c77b", "name": "sas",
  //"owner": {"emai": "o@g.com", "name": "omer", "phone": "51332266", "pic": "https://firebasestorage.googleapis.com/v0/b/project-26815.appspot.com/o/profile_pictures%2Fo%40g.com.jpg?alt=media&token=5fef3ba0-b862-42ae-97be-723a3fdf722f"}, "posted_by": "o@g.com"}
  // in case you want to implement Like Feature you can do the following inside the users tables make a like field which hold an array of liked posts exxample below
  //{"emai": "o@g.com", "name": "omer",liked_post:[By3mSiouMAbyAjfXQ0G5,By3mSiouMAbyAjfXQ0G5,By3mSiouMAbyAjfXQ0G5] all the posts id he liked <
  //"phone": "51332266", "pic": "https://firebasestorage.googleapis.com/v0/b/project-26815.appspot.com/o/profile_pictures%2Fo%40g.com.jpg?alt=media&token=5fef3ba0-b862-42ae-97be-723a3fdf722f"}

  const read = async () => {
    const docRef = doc(db, "pets", item.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().image);
      return docSnap.data().image;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: screenWidth * 1.2,
          height: "50%",
          backgroundColor: "#fff",
          borderBottomLeftRadius: screenWidth,
          borderBottomRightRadius: screenWidth,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: screenWidth * 0.8,
            height: screenWidth * 0.8,
            borderRadius: 30,
          }}
          source={{ uri: item.image }}
        />
      </View>

      <Text>PetDetails Screen</Text>

      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
      <Text> Category: {item.category.toUpperCase()}</Text>
      <Text>Description: {item.description}</Text>
      <Text>posted_by: {item.posted_by}</Text>
      <Text>Owner Name: {item.owner.name}</Text>
      <Image
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          marginRight: screenWidth * 0.04,
          borderRadius: 30,
        }}
        source={{ uri: item.owner.pic }} // Use the direct link from the object
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#C9CEF4",
  },
});