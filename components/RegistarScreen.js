import {
    View,
    Text,
    StyleSheet,
    Platform,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button } from '@rneui/themed';
import { Zocial, MaterialIcons, Feather } from '@expo/vector-icons';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./config";
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
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const SignUp = ({ navigation }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [emailUsed, setEmailUsed] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [err, setErr] = useState(false)

    const mySet = async () => {
        const docRef = doc(db, "users", email);
        await setDoc(docRef, { name: name })
            .then(() => {
                console.log("data submitted");
            })
            .catch((error) => {
                console.log(error.message);
                console.log(name)
                console.log(email)
            });
        setName("");
    };
    const handleRegister = () => {
        if (password !== confirmPassword) {
            setErr(true)
            return;
        }
        else if (password === confirmPassword) {
            setErr(false)
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                mySet()
                console.log("registered"), navigation.replace('LoginScreen')
            })
            .catch((error) => {
                console.log(error.message)
                error.message.includes('email-already-in-use') ? setEmailUsed(true) : setEmailUsed(false)
            })
    };

    return (
        <LinearGradient
            colors={['#f0f3fa', '#d5deef', '#b1c9ef', '#8aaee0', '#638ecb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container} >
                <Text style={styles.title}>Create account</Text>
                <StatusBar style="auto" />
                <View style={[styles.inputView, {

                }]}>
                    <Input
                        style={styles.input}
                        label='Name'
                        onChangeText={(text) => setName(text)}
                        underlineColorAndroid='transparent'
                        placeholder='Your Name'
                        labelStyle={{ color: "black", paddingBottom: screenWidth * 0.03, fontSize: 17, fontWeight: "400" }}
                        inputContainerStyle={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                        }}
                        containerStyle={{
                            paddingHorizontal: screenWidth * 0.02,
                            width: screenWidth * 0.9,
                        }}
                        rightIcon={
                            <Feather
                                name="user"
                                size={24}
                                color="black"
                            />
                        }
                        autoCapitalize="none"
                        autoComplete='off'
                    />

                    <Input
                        placeholder='example@gmail.com'
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        label='Email'
                        labelStyle={{ color: "black", paddingBottom: screenWidth * 0.03, fontSize: 17, fontWeight: "400" }}
                        rightIcon={
                            <Zocial
                                name="email"
                                size={24}
                                color="black"
                            />
                        }

                        inputContainerStyle={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                        }}
                        containerStyle={{
                            paddingHorizontal: screenWidth * 0.02,
                            width: screenWidth * 0.9,
                        }}
                        autoCapitalize="none"
                        autoComplete='off'
                        errorMessage={emailUsed ? 'Email already used!' : ''}
                    />

                    <Input
                        placeholder='**********'
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={!isPasswordVisible}
                        label='Password'
                        labelStyle={{ color: "black", paddingBottom: screenWidth * 0.03, fontSize: 17, fontWeight: "400" }}
                        rightIcon={
                            <MaterialIcons
                                name="password"
                                size={24}
                                color="black"
                            />
                        }
                        inputContainerStyle={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                        }}
                        containerStyle={{
                            paddingHorizontal: screenWidth * 0.02,
                            width: screenWidth * 0.9,
                        }}
                        autoComplete='off'
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder='**********'
                        style={styles.input}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={!isPasswordVisible2}
                        rightIcon={
                            <MaterialIcons
                                name="password"
                                size={24}
                                color="black"
                            />
                        }
                        label='Confirm Password'
                        labelStyle={{ color: "black", paddingBottom: screenWidth * 0.03, fontSize: 17, fontWeight: "400" }}
                        errorMessage={err ? "Password doesn't match" : ""}
                        inputContainerStyle={{
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                        }}
                        containerStyle={{
                            paddingHorizontal: screenWidth * 0.02,
                            width: screenWidth * 0.9,
                        }}
                        autoCapitalize="none"
                        autoComplete='off'
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Button
                            onPress={handleRegister}
                            title="Register"
                            titleStyle={{ fontWeight: "bold" }}
                            buttonStyle={{ backgroundColor: '#6B8BE0', paddingVertical: screenWidth * 0.045 }}
                            containerStyle={{
                                width: screenWidth * .75,
                                borderRadius: 10,
                                marginVertical: screenWidth * 0.05,
                            }}
                        />
                    </View>
                </View>

                {/* sign In  Text*/}
                <View style={{width: screenWidth, height: screenHeight* 0.1}}>
                    <View style={styles.SignInText}>
                        <Text style={styles.signInOption}>Already have an Account?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
                            <Text style={ [styles.signInOption, {color: '#0063E6'}] }>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>

    );
};

export default SignUp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#E5EBFC'
    },
    inputLabel: {
        marginLeft: 14,
        fontSize: 17
    },
    image: {
        height: 160,
        width: 170,
    },
    title: {
        fontWeight: "bold",
        fontSize: screenWidth * 0.04,
        marginTop: screenHeight * 0.03,
        fontSize: screenWidth * 0.09,
        marginLeft: screenWidth * 0.07,
        alignSelf: 'flex-start',
    },
    inputView: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: screenHeight * 0.06
    },
    input: {
        paddingHorizontal: 20,
        borderColor: "black",
    },
    rememberView: {
        width: "100%",
        paddingHorizontal: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8,
    },
    switch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    rememberText: {
        fontSize: 13,
    },
    forgetText: {
        fontSize: 11,
        color: "red",
    },
    button: {
        backgroundColor: "red",
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50,
    },
    optionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6,
    },
    mediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23,
    },
    icons: {
        width: 40,
        height: 40,
    },
    footerText: {
        textAlign: "center",
        color: "gray",
    },
    signup: {
        color: "red",
        fontSize: 13,
    },

    // Sign Up Text
    SignInText:{
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInOption:{
        fontSize: 15,
        margin: 3,
    },
});