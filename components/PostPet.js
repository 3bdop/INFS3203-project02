import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Input, Button, Text, Avatar } from "@rneui/themed";

import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "./config";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PostPet = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [age, setAge] = useState();
  const [fileName, setFileName] = useState();
  const [data, setData] = useState([]);
  const posted_by = route.params.email;
  //   const posted_by = "o@g.com"
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("dog");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      cameraType: ImagePicker.CameraType.Front,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileName(result.assets[0]);
    }
  };
  const uploadImage = async (docId) => {
    if (!image || !docId) return null; // Check if there's an image and a document ID

    const imgRef = ref(storage, `pet_images/${docId}`);

    try {
      const imgResponse = await fetch(image);
      const imgBlob = await imgResponse.blob();

      // Upload the image
      await uploadBytesResumable(imgRef, imgBlob);

      // Once uploaded, get the download URL
      const downloadURL = await getDownloadURL(imgRef);

      console.log("Image uploaded successfully. Download URL:", downloadURL);

      return downloadURL; // Return the download URL
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null; // Return null in case of error
    }
  };
  const store = async () => {
    try {
      // Notice the use of `collection` instead of `doc` for auto ID generation
      const docRef = await addDoc(collection(db, "pets"), {
        name: name,
        age: age,
        category: category,
        posted_by: posted_by,
        description: description,
      });
      console.log("Document written with ID: ", docRef.id);
      setId(docRef.id); // Set the auto-generated ID
      const imageUrl = await uploadImage(docRef.id); // Assuming uploadImage function returns image URL
      await updateDoc(docRef, { image: imageUrl });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleAll = async () => {
    setIsLoading(true);
    const tempID = await store();
    setIsLoading(false);
    navigation.navigate("Home", { c: 1 });
    setAge("");
    setCategory("dog");
    setDescription("");
    setName("");
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topHeading}>New Post</Text>
      <Avatar
        titleStyle={{ color: "black" }}
        onPress={() => pickImage()}
        size={"xlarge"}
        source={{ uri: image }}
        rounded
        title="+"
        placeholder="image"
        containerStyle={styles.avatar}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: screenHeight * 0.01,
        }}
      >
        <Input
          autoCapitalize="none"
          value={name}
          onChangeText={(txt) => setName(txt)}
          placeholder="Milo"
          label="Pet Name: "
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
          keyboardAppearance="dark"
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Input
          autoCapitalize="none"
          value={age}
          onChangeText={(txt) => setAge(txt)}
          placeholder="2 years , 3 months"
          label="Pet Age:"
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
          keyboardAppearance="dark"
        />
        <Text style={{ fontSize: screenWidth * 0.04, fontWeight: "bold" }}>
          Pet Category
        </Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          label="category"
          selectedValue={category}
          onValueChange={(item) => setCategory(item)}
          numberOfLines={1}
        >
          <Picker.Item label="dog" value="dog" style={styles.picker} />
          <Picker.Item label="cat" value="++" style={styles.picker} />
          <Picker.Item label="bird" value="bird" style={styles.picker} />
        </Picker>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Input
          autoCapitalize="none"
          value={description}
          onChangeText={(txt) => setDescription(txt)}
          placeholder="This is a cute pet"
          label="Description"
          labelStyle={{ color: "black", fontSize: 17, fontWeight: "400" }}
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
          keyboardAppearance="dark"
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          onPress={handleAll}
          title={
            isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Create"
            )
          }
          titleStyle={{ fontWeight: "bold" }}
          buttonStyle={{ backgroundColor: "#6B8BE0" }}
          containerStyle={{
            width: screenWidth * 0.5,
            borderRadius: 10,
            // marginHorizontal: -1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow",
  },
  topHeading: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: screenWidth * 0.06,
    marginTop: screenHeight * 0.01,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 5,
    borderWidth: 1,
    color: "black",
  },
  pickerContainer: {
    height: 100,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 30,
    justifyContent: "center",
  },
  picker: {
    height: 40,
    width: "100%",
  },
});

export default PostPet;
