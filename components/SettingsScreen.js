import { StyleSheet, Dimensions, Image, Text, View, TouchableOpacity, Platform, TextInput, ScrollView, SafeAreaView } from 'react-native';
import React from 'react'
import { Feather, MaterialIcons } from 'react-native-vector-icons'
import { Avatar, Card } from '@rneui/themed';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <View style={styles.accountContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTxt}>Account</Text>
                    </View>

                    {/* Support & About options */}
                    <Card containerStyle={[styles.CardContainer, { height: screenHeight * 0.13 }]}>

                        {/* Edit Profile */}
                        <TouchableOpacity style={[styles.options, { height: '45%' }]}>
                            <Feather name={'user'} size={25} color={'#818181'} />
                            <Text style={styles.txt}>Edit Profile</Text>
                        </TouchableOpacity>

                        <CardDivider />

                        {/* Log Out */}
                        <TouchableOpacity onPress={() => navigation.replace('Main')} style={[styles.options, { height: '40%' }]}>
                            <MaterialIcons name={'logout'} size={25} color={'#818181'} />
                            <Text style={styles.txt}>Log Out</Text>
                        </TouchableOpacity>

                    </Card>
                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6e6',
        flex: 1
    },
    header: {
        width: screenWidth,
        height: screenHeight * 0.05,
        // backgroundColor: 'pink',
        // marginTop: 20,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    headerTxt: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    accountContainer: {
        // backgroundColor: 'tomato',
        height: screenHeight * 0.32,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    CardContainer: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.23,
        backgroundColor: 'white',
        borderRadius: 7,
    },
    options: {
        // backgroundColor: 'lightgray',
        height: '19%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        fontWeight: 'bold',
        paddingLeft: 15,

    },
})