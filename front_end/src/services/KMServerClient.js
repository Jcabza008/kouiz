import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserLoginModel, UserRegisterModel, QuizModel, QuestionModel} from "./Models";

// General constants
const authKeyName = "set-cookie";
const schema = "http";
const hostAddress = "10.20.93.198:1900";
const hostPort = "5000"
const authFailedRedirect = "LoginScreen";

export class ClientReturnObj {
    constructor(response, error) {
        this.response = response;
        this.error = error;
    }

    response;
    error;
}

export default class KMServerClient {
    // construct the full url for the request
    static buildFullUrl(endpoint) {
        return schema + "://" + hostAddress + ":" + hostPort + "/" + endpoint;
    }

    static async checkUserSignedIn() {
        try {
           let value = await AsyncStorage.getItem(authKeyName);
           if (value != null){
              return true;
           }
           else {
              return false;
          }
        } catch (error) {
          console.error(error);
        }
    }

    static async signInUser(key) {
        await AsyncStorage.setItem(authKeyName, key)
    }

    // makes a generic request based on the paramers and returns the request payload
    static async request(endpoint, method, payload, noauth = false) {
        let headers = {
            'accept' : 'text/plain',
            'Content-type': 'application/json'
        }

        if(!noauth) {
            if(this.checkUserSignedIn()) {
                async () => {
                    headers[authKeyName] = await AsyncStorage.getItem(authKeyName);
                }
            } else {
                this.props.navigation.navigate(authFailedRedirect);
            }
        }

        console.log(payload);

        let response = await fetch(
            this.buildFullUrl(endpoint),
            {
                method: method,
                body: JSON.stringify(payload),
                headers: headers,
            }
        )
        .then(response => {
            if (!response.ok) {
                throw response
            }
            if(endpoint == "api/auth") {
                if(method == "PUT") {
                    async () => {
                        await AsyncStorage.setItem(authKeyName, response.headers.get(authKeyName))
                    }
                } else if(method == "DELETE") {
                    async () => {
                        await AsyncStorage.removeItem(authKeyName);
                    }
                }
            }
            return response.json()
        });

        return response;
    }

    static async registerUser(userRegisterModel) {
        let response;
        try {
            response = await this.request("api/auth", "POST", userRegisterModel, true);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async loginUser(userLoginModel) {
        let response;
        try {
            response = await this.request("api/auth", "PUT", userLoginModel, true);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async logoutUser() {
        let response;
        try {
            response = await this.request("api/auth", "DELETE", null);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async getQuizzes() {
        let response;
        try {
            response = await this.request("api/quizzes", "GET", null);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async getQuiz(id) {
        let response;
        try {
            response = await this.request("api/quizzes" + new URLSearchParams({
                id: id
            }), "GET", null);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async createQuiz(quizModel) {
        let response;
        try {
            response = await this.request("api/quizzes", "POST", quizModel);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async updateQuiz(quizModel) {
        let response;
        try {
            response = await this.request("api/quizzes", "PUT", quizModel);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async deleteQuiz(id) {
        let response;
        try {
            response = await this.request("api/quizzes" + new URLSearchParams({
                id: id
            }), "DELETE", null);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }

    static async deleteQuiz(quizModel) {
        let response;
        try {
            response = await this.request("api/quizzes", "DELETE", quizModel);
            return new ClientReturnObj(response, null);
        } catch(err) {
            console.error(err);
            return new ClientReturnObj(null, err);
        }
    }
}