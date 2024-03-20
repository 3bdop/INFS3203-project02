import {  StyleSheet, Dimensions, Image, Text, View, TouchableOpacity, Platform, TextInput, ScrollView, SafeAreaView,} from 'react-native'
import React from 'react'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Category = ( { name, image, onPress, backgroundColor } ) => {

  return (
        
    <TouchableOpacity style={[styles.category, {backgroundColor}]} onPress={onPress}>
        <View style={styles.categoryImageContainer}>
            <Image source={image} style={{width: '100%', height: '100%'}}/>
        </View>
        <Text style={styles.categoryText}>{name}</Text>
    </TouchableOpacity>

  )
}

export default Category

const styles = StyleSheet.create({
    category:{
        backgroundColor: 'white',
        width: screenWidth * 0.3,
        height: screenHeight * 0.065,
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryImageContainer:{
        // backgroundColor: 'red',
        width: '50%',
        height: '90%',
        marginLeft: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    categoryText:{
        fontSize: 18,
        paddingRight: 10
    },
})