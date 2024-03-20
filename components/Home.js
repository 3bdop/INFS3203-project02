import {  StyleSheet, Dimensions, Image, Text, View, TouchableOpacity, Platform, TextInput, ScrollView, SafeAreaView,} from 'react-native'
import React , {useEffect, useState} from 'react'
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "react-native-vector-icons";
import { Avatar, Button, Card } from "@rneui/themed";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

import AnimalCard from './AnimalCard';
import Category from './Category';

const Home = ( {navigation} ) => {

    const [categories, SetCategories] = useState([
        {name: 'Dog', image: require('../assets/dog_category.jpeg')},
        {name: 'Cat', image: require('../assets/cat_category.jpg')},
        {name: 'Bird', image: require('../assets/bird_category.jpeg')},
    ])

    const [animals, setAnimals] = useState(
        [{
          name: "Oscar",
          category: "bird",
          age: "1 year old",
          gender: "Male",
          weight: "1 kg",
          about: "Intelligent and social, birds make fascinating pets with their ability to learn tricks and sometimes even mimic human speech.",
          image: require('../assets/bird1.jpeg')
        },
        {
          name: "Bella",
          category: "cat",
          age: "8 months old",
          gender: "Female",
          weight: "2 kg",
          about: "Social and adaptable, Cats are known for their distinctive quacking and can make surprisingly affectionate pets.",
          image: require('../assets/cat1.jpg')
        },
        {
          name: "Nina",
          category: "dog",
          age: "2 years old",
          gender: "Female",
          weight: "7.23 kg",
          about: "Intelligent and social, dogs make fascinating pets with their ability to learn tricks and sometimes even mimic human speech.",
          image: require('../assets/dog1.jpeg')
        },
        {
          name: "Charlie",
          category: "cat",
          age: "3 years old",
          gender: "Female",
          weight: "5 kg",
          about: "Intelligent and social, cats make fascinating pets with their ability to learn tricks and sometimes even mimic human speech.",
          image: require('../assets/cat2.jpeg')
        },
        {
          name: "Lola",
          category: "bird",
          age: "7 months old",
          gender: "Male",
          weight: "3 kg",
          about: "Social and adaptable, birds are known for their distinctive quacking and can make surprisingly affectionate pets.",
          image: require('../assets/bird2.jpeg')
        },
        {
          name: "Lucy",
          category: "dog",
          age: "7 years old",
          gender: "Female",
          weight: "20 kg",
          about: "Loyal and friendly, dogs are known for their companionship and ability to bond with humans.",
          image: require('../assets/dog2.jpeg')
        }]
    )

    const [selectedCategory, setSelectedCategory] = useState(null);

  return (
<SafeAreaView style={styles.container}>
        <ScrollView>
        {/* Profile Header */}
      <View style={styles.profileHeaderContainer}>

         {/* Welcoming text */}
         <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons name={'vector-square-plus'} size={23} style={{marginLeft: 15}}/>
            <Text style={styles.welcomeTxt}>Welcome</Text>
         </View>

         {/* Profile pic */} 
         <View style={{marginRight: 20}}>
            <Avatar size={'medium'}rounded source={require('../assets/user.jpg')}/>
         </View>

      </View>


        {/* Search Bar Section*/}
        <View style={styles.searchBarContainer}>
        <View style={styles.inputIconContainer}>
          <TouchableOpacity>
          <AntDesign name="search1" size={20} color={"#BABABA"} style={styles.searchIcon}/>
          </TouchableOpacity>
          <TextInput placeholder="Search here..." style={styles.searchBox}/>
        </View>
      </View>

        {/* Donation Card Section*/}
        <View style={styles.donationCardContainer}>

            <View style={styles.donationCard}>
                <View style={styles.captionContainer}>
                    <Text style={styles.captionText}>Street pets needs protection</Text>
                    <TouchableOpacity style={styles.donationBotton}>
                        <Text style={styles.donateText}>Donate Now</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={require('../assets/donation_cat.png')} style={styles.catImage}/>
                </View>
            </View>
        </View>

        {/* Catigories Section*/}
        <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesText}>Categories</Text>
        </View>

        <View style={styles.categoryContainer}>

            <ScrollView horizontal contentContainerStyle={styles.categoriesScrollContainer}>
                {categories.map((category, index) => (
                    <Category 
                        key={index} 
                        name={category.name} 
                        image={category.image} 
                        onPress={() => setSelectedCategory(category.name)}
                        backgroundColor={selectedCategory === category.name ? '#9999ff' : 'white'}
                        />
                    ))}
            </ScrollView>

        </View>
        
        {/* Animal Card Section */}
        <View style={styles.animalCardContainer}>

            <ScrollView horizontal contentContainerStyle={{alignItems: 'center'}}>
                {animals
                .filter(animal => selectedCategory === null || animal.category.toLowerCase() === selectedCategory.toLowerCase())
                .map((animal, index) => (
                    <AnimalCard key={index} animal={animal} />
            ))}
            </ScrollView>

        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    // Profile Header
    profileHeaderContainer:{
        // backgroundColor: 'gray',
        width: screenWidth,
        height: screenHeight * 0.1,
        // marginLeft: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    welcomeTxt:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },

    // Search Bar
    searchBarContainer: {
        // backgroundColor: 'pink',
        width: screenWidth,
        height: screenHeight * 0.1,
        justifyContent: "center",
        alignItems: "center",
      },
      inputIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: screenWidth * 0.83,
        borderRadius: 10,
      },
      searchIcon: {
        marginLeft: 10,
      },
      searchBox: {
        // backgroundColor: 'white',
        width: screenWidth * 0.78,
        height: screenHeight * 0.056,
        borderRadius: 10,
        paddingLeft: 10,
    },

    // Donation Card
    donationCardContainer:{
        // backgroundColor: 'tomato',
        width: screenWidth,
        height: screenHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    donationCard:{
        backgroundColor: '#9999ff',
        width: '90%',
        height: '90%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    captionContainer:{
        // backgroundColor: 'red',
        width: '53%',
        height: '80%',
        justifyContent: 'center',
    },
    captionText:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: 10
    },
    donationBotton:{
        backgroundColor: 'white',
        width: '70%',
        height: '35%',
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    donateText:{
        fontSize: 16,
        color: '#6666ff'
    },
    imageContainer:{
        // backgroundColor: 'pink',
        width: '45%',
        height: '80%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    catImage:{
        width: screenWidth*0.23, 
        height: screenHeight*0.2
    },

    // Categories
    categoriesHeader:{
        // backgroundColor: 'lightgray',
        width: screenWidth,
        height: screenHeight * 0.06,
        justifyContent: 'center'
    },
    categoriesText:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    categoryContainer:{
        // backgroundColor: 'red',
        width: screenWidth,
        height: screenHeight * 0.1
    },
    categoriesScrollContainer:{
        // backgroundColor: 'pink',
        alignItems: 'center'
    },

    // Animal Section
    animalCardContainer:{
        // backgroundColor: 'tomato',
        width: screenWidth,
        height: screenHeight * 0.3,
        alignItems: 'center',
        flexDirection: 'row'
    },
})