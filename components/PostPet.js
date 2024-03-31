import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { Input, Button, Text, Avatar } from "@rneui/themed";
import axios from 'axios';
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
  const [weight, setWeight] = useState();
  const [fileName, setFileName] = useState();
  const [data, setData] = useState([]);
  const posted_by = route.params.email;
  //   const posted_by = "o@g.com"
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("dog");
  const [gender, setGender] = useState(null);
  const [image, setImage] = useState(null);
  const [imageBG, setImageBG] = useState(null);
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

  const removeBackground = async (imageUrl, docId) => {

    const encodedParams = new URLSearchParams();
    encodedParams.set('image_url', imageUrl);

    const options = {
      method: 'POST',
      url: 'https://background-removal.p.rapidapi.com/remove',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '11c5c3134emsh853ea4476e89126p15141djsn3a7810aaead0',
        'X-RapidAPI-Host': 'background-removal.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const imgRef = ref(storage, `pet_images/${docId}`);

      // Assuming the response data contains the URL of the background removed image
      const imgResponse = await fetch(response.data.response.image_url);
      const imgBlob = await imgResponse.blob();

      // Upload the image
      await uploadBytesResumable(imgRef, imgBlob);

      // Once uploaded, get the download URL
      const downloadURL = await getDownloadURL(imgRef);
      // setImageBG(downloadURL)
      return downloadURL
    } catch (error) {
      console.error(error);
      return null; // Return null in case of error
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
        gender: gender,
        weight: weight,
      });
      console.log("Document written with ID: ", docRef.id);
      setId(docRef.id); // Set the auto-generated ID
      const imageUrl = await uploadImage(docRef.id);
      let imgBG = await removeBackground(imageUrl, docRef.id)
      // Assuming uploadImage function returns image URL
      await updateDoc(docRef, { image: imgBG });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleAll = async () => {
    setIsLoading(true);
    // removeBackground(image)
    const tempID = await store();
    setIsLoading(false);
    setImage(null);
    navigation.navigate("Home", { c: 1 });
    setAge("");
    setCategory("dog");
    setDescription("");
    setName("");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={{ paddingBottom: screenHeight * 0.5 }}>
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
      {/* <Button title={'press'} onPress={() => removeBackground(image)} /> */}
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
      <View style={{ justifyContent: 'space-around' }}>
        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
          <Input
            autoCapitalize="none"
            value={age}
            onChangeText={(txt) => setAge(txt)}
            placeholder="2 years, 3 months"
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
              width: screenWidth * 0.45,
            }}
            keyboardAppearance="dark"
          />
          <Input
            autoCapitalize="none"
            value={weight}
            onChangeText={(txt) => setWeight(txt)}
            placeholder="5kg"
            label="Pet Weight:"
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
              width: screenWidth * 0.45,
            }}
            keyboardAppearance="dark"
          />
        </View>
      </View>
      <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
        <Text style={{ fontSize: screenWidth * 0.04, fontWeight: "bold" }}>
          Pet Category
        </Text>
        <Text style={{ fontSize: screenWidth * 0.04, fontWeight: "bold" }}>
          Gender
        </Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          label="category"
          selectedValue={category}
          onValueChange={(item) => setCategory(item)}
          numberOfLines={1}
          style={{ width: '50%' }}
        >
          <Picker.Item label="dog" value="dog" style={styles.picker} />
          <Picker.Item label="cat" value="cat" style={styles.picker} />
          <Picker.Item label="bird" value="bird" style={styles.picker} />
          <Picker.Item label="monkey" value="monkey" style={styles.picker} />
        </Picker>
        <Picker
          label="gender"
          selectedValue={gender}
          onValueChange={(item) => setGender(item)}
          numberOfLines={1}
          style={{ width: '50%' }}
        >
          <Picker.Item label="male" value="male" style={styles.picker} />
          <Picker.Item label="female" value="female" style={styles.picker} />
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
      </ScrollView>
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
    alignItems: 'center',
    flexDirection: 'row'
  },
  picker: {
    height: 40,
    width: "100%",
  },
});

export default PostPet;