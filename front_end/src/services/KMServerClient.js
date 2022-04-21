import React from "react";
import {View, Text, TextInput, StyleSheet, useColorScheme, RefreshControlBase} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserLoginModel, UserRegisterModel, QuizModel, QuestionModel} from "./Models";

// General constants
const authKeyName = "set-cookie";
const authId = "curr_id";
const authUsername = "curr_username";
const authFirstName = "curr_firstname";
const authLastName = "curr_lastname";
const schema = "http";
const hostAddress = process.env.HOST_ADDR;
const hostPort = 5000;

export class ClientReturnObj {
    constructor(response, error) {
        this.response = response;
        this.error = error;
    }

    response;
    error;
}

export default class KMServerClient extends React.Component {
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

    static async getUserInfo() {
        if(await this.checkUserSignedIn() == false) {
            throw Error("User is not signed in");
        }

        return {
            id: await AsyncStorage.getItem(authId),
            username: await AsyncStorage.getItem(authUsername),
            firstname: await AsyncStorage.getItem(authFirstName),
            lastname: await AsyncStorage.getItem(authLastName)
        }
    };

    // makes a generic request based on the paramers and returns the request payload
    static async request(endpoint, method, payload, noauth = false) {
        console.log("New Request to: " + endpoint);
        console.log("Method: " +method);
        console.log("Payload:" + payload);
        console.log("Auth: " + noauth);

        let headers = {
            'accept' : 'text/plain',
            'Content-type': 'application/json'
        }

        if(!noauth) {
            if(await this.checkUserSignedIn()) {
                async () => {
                    headers[authKeyName] = await AsyncStorage.getItem(authKeyName);
                }
            } else {
                throw Error("User is not signed in");
            }
        }

        let response = await fetch(
            this.buildFullUrl(endpoint),
            {
                method: method,
                body: payload == null ? null : JSON.stringify(payload),
                headers: headers,
            }
        )
        .then(response => {
            if (!response.ok) {
                throw response
            }
            if(endpoint == "api/auth") {
                if(method == "PUT") {
                    AsyncStorage.setItem(authKeyName, response.headers.get(authKeyName));
                } else if(method == "DELETE") {
                    AsyncStorage.removeItem(authKeyName);
                    AsyncStorage.removeItem(authId);
                    AsyncStorage.removeItem(authUsername);
                    AsyncStorage.removeItem(authFirstName);
                    AsyncStorage.removeItem(authLastName);
                }
            }
            return response.json();
        })
        .then(data => {
            console.log("Response payload: " + JSON.stringify(data))
            if(endpoint == "api/auth" && method == "PUT") {
                AsyncStorage.setItem(authId, data.id);
                AsyncStorage.setItem(authUsername, data.userName);
                AsyncStorage.setItem(authFirstName, data.firstName);
                AsyncStorage.setItem(authLastName, data.lastName);
            }

            return data;
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