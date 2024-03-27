import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Main from "./components/Main";
import LoginScreen from "./components/LoginScreen";
import Register from "./components/RegistarScreen";
import Home from "./components/Home";
import SettingsScreen from "./components/SettingsScreen";
import EditProfile from "./components/EditProfile";
import PetDetails from "./components/PetDetails";

import { TabBarIOS } from "react-native";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
function Feed({ navigation, route }) {
  const email = route.params.email;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      styles={{ backgroundColor: "red" }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6B8BE0", // Color of the icon when tab is active
        tabBarInactiveTintColor: "grey", //
        tabBarIconStyle: { justifyContent: "center" },
      }}
    >
      <Tab.Screen
        name="Home"
        initialParams={{ email: email }}
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        initialParams={{ email: email }}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
      {/* CreatePostScreen */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "Edit Profile",
          }}
        />
        <Stack.Screen
          name="PetDetails"
          component={PetDetails}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
