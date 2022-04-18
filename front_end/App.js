import 'react-native-gesture-handler';
import React from "react";

//import react navigation

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//import screens

import HomeScreen from "./src/screens/HomeScreen"
import RegisterScreen from "./src/screens/RegisterScreen"
import LoginScreen from "./src/screens/LoginScreen"
import QuizEditor from "./src/screens/QuizEditor"
import UserHomeScreen from "./src/screens/UserHomeScreen"
import Home from "./src/components/Home"


class Quiz
{
  constructor(name)
  {
    this.name = name;
    this.questions = [];
  }

  addQuestion(Question, Answer)
  {
    this.questions.push(Question, Answer)
  }

  getName()
  {
    return this.name;
  }
  
}

class UserQuizzes
{
  constructor()
  {
    this.quizzes = [];
  }

  addQuiz(name)
  {
    let newQuiz = new Quiz(name)
    this.quizzes.push(newQuiz)
  }

  getQuizName(index)
  {
    return this.quizzes[index].getName
  }

}


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
        <Stack.Screen name = "QuizEditor" component = {QuizEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
