import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export class UserLoginModel {
    username;
    password;
}

export class UserRegisterModel {
    username;
    firstname;
    lastname;
    password;
}

export class QuizModel {
    id;
    ownerId;
    name;
    questions;
}

export class QuestionModel {
    id;
    prompt;
    answer;
    keywords;
    order;
}