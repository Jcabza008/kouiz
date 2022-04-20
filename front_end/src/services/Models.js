import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export class UserLoginModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    username;
    password;
}

export class UserRegisterModel {
    constructor(username, firstname, lastname, password) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
    }

    username;
    firstname;
    lastname;
    password;
}

export class QuizModel {
    constructor(id, ownerID, name, questions) {
        this.id = id;
        this.ownerId = ownerID;
        this.name = name;
        this.questions = questions;
    }

    id;
    ownerId;
    name;
    questions;
}

export class QuestionModel {
    constructor(id, prompt, answer, keywords, order) {
        this.id = id;
        this.prompt = prompt;
        this.answer = answer;
        this.keywords = keywords;
        this.ordr = order;
    }

    id;
    prompt;
    answer;
    keywords;
    order;
}