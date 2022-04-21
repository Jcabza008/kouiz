import 'react-native-gesture-handler';
import React from "react";

//import react navigation

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//import screens

import HomeScreen from "./src/screens/HomeScreen"
import RegisterScreen from "./src/screens/RegisterScreen"
import LoginScreen from "./src/screens/LoginScreen"
import QuizEditorScreen from "./src/screens/QuizEditorScreen"
import UserHomeScreen from "./src/screens/UserHomeScreen"
import Home from "./src/components/Home"
import QuizScreen from "./src/screens/QuizScreen"
import AnswerScreen from "./src/screens/AnswerScreen"
import CompleteScreen from "./src/screens/AnswerScreen"

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
        <Stack.Screen name = "Answer" component = {AnswerScreen} />
        <Stack.Screen name = "Complete" component = {CompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
