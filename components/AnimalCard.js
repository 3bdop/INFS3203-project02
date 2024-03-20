import {  StyleSheet, Dimensions, Image, Text, View, TouchableOpacity, Platform, TextInput, ScrollView, SafeAreaView,} from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AnimalCard = ( {animal} ) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.animalImageContainer}>
        <Image source={animal.image} style={{width: '100%', height: '120%'}}/>
      </View>

      <View style={styles.animalInfoContainer}>
        <Text style={{fontSize: 20, marginBottom: 5, color: 'white'}}>{animal.name}</Text>
        <Text style={{fontSize: 15, color: 'white'}}>{animal.age}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AnimalCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: '#9999ff',
        width: screenWidth * 0.5,
        height: screenHeight * 0.25,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    animalImageContainer:{
        backgroundColor: 'red',
        width: '90%',
        height: '67%',
        marginTop: 10,
        borderRadius: 15,
        overflow: 'hidden'
    },
    animalInfoContainer:{
        // backgroundColor: 'yellow',
        width: '90%',
        height: '30%',
        borderRadius: 15,
        justifyContent: 'center',
        paddingLeft: 5
    },
})