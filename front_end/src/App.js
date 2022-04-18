import 'react-native-gesture-handler';
import React from "react";

//import react navigation

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//import screens

import HomeScreen from "./screens/HomeScreen"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"
import QuizEditorScreen from "./screens/QuizEditorScreen"
import UserHomeScreen from "./screens/UserHomeScreen"
import Home from "./components/Home"
import QuizScreen from "./screens/QuizScreen"

const Stack = createNativeStackNavigator();

export default function App() {

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainHome" screenOptions = {{headerShown: false}}>
        <Stack.Screen name="MainHome" component = {HomeScreen} />
        <Stack.Screen name="Register" component = {RegisterScreen} />
        <Stack.Screen name="Login" component = {LoginScreen} />
        <Stack.Screen name ="UserHome" component = {UserHomeScreen} />
        <Stack.Screen name ="Home" component = {Home} />
        <Stack.Screen name = "QuizEditor" component = {QuizEditorScreen} />
        <Stack.Screen name = "Quiz" component = {QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
