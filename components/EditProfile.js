import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, SafeAreaView, StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Card } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, doc, collection, getDoc, getDocs, setDoc, query, where, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "./config";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const EditProfile = ({ navigation, route }) => {
    const { email } = route.params
    const [image, setImage] = useState(null)
    const [newName, setNewName] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            setImage(uri);
        }
    }

    const uploadImage = async (docId) => {
        if (!image || !docId) return null; // Check if there's an image and a document ID

        const imgRef = ref(storage, `profile_pictures/${docId}`);

        try {
            const imgResponse = await fetch(image);
            const imgBlob = await imgResponse.blob();

            // Upload the image
            await uploadBytesResumable(imgRef, imgBlob);

            // Once uploaded, get the download URL
            const downloadURL = await getDownloadURL(imgRef);

            console.log('Image uploaded successfully. Download URL:', downloadURL);

            return downloadURL; // Return the download URL
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null; // Return null in case of error
        }
    };
    const store = async () => {
        try {
            // Get a reference to the document with the email ID
            const docRef = doc(db, "users", email);

            // Upload the image and get the URL
            const imageUrl = await uploadImage(email);

            // Update the document with the new name and image
            await updateDoc(docRef, { name: newName, pic: imageUrl });

            console.log("Document updated with ID: ", email);
        } catch (error) {
            console.error("Error adding document: ", error);
        }

    };

    const handleAll = async () => {
        setIsLoading(true)
        const tempID = await store()
        setIsLoading(false)
        navigation.navigate("Home")
    }
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>


                <View style={styles.avatarContainer}>
                    <Avatar size={'xlarge'} rounded source={image ? { uri: image } : require('../assets/user.jpg')} />
                </View>

                {/* Change Pic Botton Container */}
                <View style={styles.changePicBottonContainer}>

                    <TouchableOpacity style={styles.changePicButton} onPress={pickImage}>
                        <Text style={styles.changePicTxt}>Change Picture</Text>
                    </TouchableOpacity>

                </View>

                {/* User Info */}
                <View style={styles.userInfo}>

                    {/* Name */}
                    <View style={styles.userInfoHeaderContainer}>
                        <Text style={styles.headerTxt}>Name</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Mohamed' style={styles.input} />
                    </View>

                    {/* Email ID */}

                </View>

                {/* Update Button */}
                <View style={styles.UpdateButtonContainer}>
                    <TouchableOpacity style={styles.UpdateButton} onPress={handleAll}>
                        <Text style={styles.UpdateTxt}>Update</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e6e6',
        flex: 1,
        alignItems: 'center'
    },

    // Avatar Container
    avatarContainer: {
        // backgroundColor: 'tomato',
        width: screenWidth,
        height: screenHeight * 0.23,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    // Change Pic Button
    changePicBottonContainer: {
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    changePicButton: {
        backgroundColor: '#2F7694',
        width: '45%',
        height: '50%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePicTxt: {
        color: 'white'
    },

    // User Information
    userInfo: {
        // backgroundColor: 'pink',
        width: screenWidth,
        height: screenHeight * 0.4,

    },
    userInfoHeaderContainer: {
        // backgroundColor: 'gray',
        width: '100%',
        // height: '8%',
        marginTop: 10,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    headerTxt: {
        fontSize: 17,
        paddingBottom: 5
    },
    inputContainer: {
        // backgroundColor: 'yellow',
        height: '15%',
        paddingLeft: 20,
    },
    input: {
        width: '90%',
        height: '85%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingLeft: 10,
    },

    // Sign Up Button
    UpdateButtonContainer: {
        // backgroundColor: 'lightgray',
        width: screenWidth,
        height: screenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Update Button
    UpdateButton: {
        width: '80%',
        height: '60%',
        backgroundColor: '#2F7694',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    UpdateTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
})