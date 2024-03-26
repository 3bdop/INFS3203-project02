import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { Image, Input, Button, Card, Divider, SearchBar } from "@rneui/themed";
import Category from "./Category";
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

export default function HomeScreen({ navigation, route }) {
  const [pets, setPets] = useState([]);
  const [userData, setUserData] = useState(null);
  const { email } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSerach] = useState("");
  const [active, setActive] = useState("");
  const [petsWithOwners, setPetsWithOwners] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", email);
        // const docRef = doc(db, "users", "test@g.com");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:");
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchPetsWithOwners = async () => {
      try {
        const petsCollection = collection(db, "pets");
        const petsSnapshot = await getDocs(petsCollection);

        const petsWithOwnersData = [];
        for (const petDoc of petsSnapshot.docs) {
          const petData = petDoc.data();
          const ownerEmail = petData.posted_by;

          // Fetch user details based on the owner's email
          const userDocRef = doc(db, "users", ownerEmail);
          const userDocSnapshot = await getDoc(userDocRef);
          const userData = userDocSnapshot.data();

          const petWithOwner = {
            id: petDoc.id,
            ...petData,
            owner: userData, // Add owner details to the pet object
          };

          petsWithOwnersData.push(petWithOwner);
          console.log(petWithOwner);
        }

        setPetsWithOwners(petsWithOwnersData);
      } catch (error) {
        console.error("Error fetching pets with owners:", error);
      }
    };

    fetchPetsWithOwners();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!userData ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.firstTopView}>
            <Text style={styles.topWelcomeText}>Welcome {userData.name} </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', { email: email })}
              style={{
                width: 50,
                height: 50,
                marginRight: screenWidth * 0.04,
                borderRadius: 30,
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 1,
                  marginRight: screenWidth * 0.04,
                  borderRadius: 30,
                }}
                source={{ uri: userData.pic }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.seacrhView}>
            <SearchBar
              onChangeText={setSerach}
              value={search}
              autoCapitalize="none"
              placeholder="Search here ..."
              inputContainerStyle={{ backgroundColor: "snow" }}
              containerStyle={{ backgroundColor: "snow" }}
              platform="ios"
              searchIcon={Platform.OS === "ios" ? { name: "search" } : null}
              clearIcon={
                Platform.OS === "ios" ? { name: "close-circle" } : null
              }
            />
          </View>
          <View style={styles.petOuterCar}>
            <View
              style={{
                zIndex: 1,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: screenWidth * 0.05,
                  fontWeight: "bold",
                  height: "40%",
                  marginRight: "42%",
                  color: "white",
                  marginTop: "2%",
                }}
              >
                You don't need {"\n"}your pet?
              </Text>
              <TouchableOpacity style={styles.donate}>
                <Text style={{ color: "#6B8BE0", fontWeight: "bold" }}>
                  Find Home
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.catHomeCont}>
              <Image
                source={require("../assets/catHome.png")}
                style={{
                  marginLeft: 30,
                  width: 135,
                  height: screenWidth * 0.45,
                }}
              />
            </View>
          </View>

          <Category active={active} setActive={setActive} />

          {!petsWithOwners ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator style={{ color: "red" }} size={"large"} />
            </View>
          ) : (
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {petsWithOwners
                  .filter(
                    (item) =>
                      item.name &&
                      item.name.toLowerCase().includes(search.toLowerCase()) &&
                      (!active ||
                        item.category.toLowerCase() === active.toLowerCase())
                  )
                  .map((item, index) => (
                    <View key={index} style={styles.cardStyle}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PetDetails", { item })
                        }
                      >
                        <Card
                          containerStyle={{ borderRadius: screenWidth * 0.03 }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              borderRadius: screenWidth * 0.03,
                              backgroundColor:
                                index % 2 == 0 ? "#fcd9b9" : "#EBEDFE",
                              marginBottom: "7%",
                            }}
                          >
                            <Image
                              style={{
                                width: screenWidth * 0.3,
                                height: screenWidth * 0.3,
                                margin: "5%",
                                resizeMode: "stretch",
                                alignSelf: "center",
                                borderRadius: screenWidth * 0.05,
                              }}
                              source={{ uri: item.image }}
                            />
                          </View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: screenWidth * 0.04,
                              marginHorizontal: "-3%",
                            }}
                          >
                            {" "}
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              color: "grey",
                              fontSize: screenWidth * 0.03,
                            }}
                          >
                            {item.age} old
                          </Text>
                        </Card>
                      </TouchableOpacity>
                    </View>
                  ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow",
  },
  topWelcomeText: {
    fontSize: screenWidth * 0.07,
    marginLeft: screenWidth * 0.04,
    fontWeight: "bold",
  },
  firstTopView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: screenHeight * 0.003,
    alignItems: "center",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seacrhView: {
    paddingTop: 15,
    width: screenWidth * 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  petOuterCar: {
    marginTop: screenHeight * 0.03,
    backgroundColor: "#6B8BE0",
    width: screenWidth * 0.9,
    borderRadius: screenWidth * 0.06,
    alignSelf: "center",
    height: screenHeight * 0.18,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  outerCategory: {
    width: screenWidth * 0.9,
    backgroundColor: "#6B8BE0",
    alignSelf: "center",
    margin: 30,
  },
  donate: {
    marginTop: "3%",
    marginRight: "43%",
    padding: 3,
    width: "46%",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    borderRadius: screenWidth * 0.02,
    backgroundColor: "white",
  },
  catHomeCont: {
    zIndex: 2,
    flex: 1,
    marginHorizontal: "-50%",
    marginVertical: "-8%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  outerCategory: {
    width: screenWidth * 0.9,
    backgroundColor: "white",
    alignSelf: "center",
    margin: 30,
  },
  animalCategoryCard: {
    width: 150,
    height: 70,
    backgroundColor: "grey",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 15,
    alignItems: "center",
  },
  animalImageCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 3,
  },
  animalCardFontSize: {
    fontSize: screenWidth * 0.06,
  },
  cardStyle: {
    width: screenWidth * 0.6,
    backgroundColor: "snow",
    flex: 1,
    marginHorizontal: screenWidth * 0,
  },
});
