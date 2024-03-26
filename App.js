import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './components/Main'
import LoginScreen from './components/LoginScreen'
import Home from './components/Home';
import RegistarScreen from './components/RegistarScreen';
import EditProfile from './components/EditProfile';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Main">
    //     <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
    //     <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false}} />
    //     <Stack.Screen name='RegistarScreen' component={RegistarScreen} options={{ headerShown: false}} />
    //     <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false}} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <EditProfile/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
