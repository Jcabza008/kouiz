import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import Swiper from 'react-native-swiper'

import AppButton from "../components/AppButton.js"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


export default function HomeScreen ({navigation}){
    return (
    <View style = {{flex: 1, color: 'white'}}>
      <View style={{flex: 2, paddingVertical: 20, fontFamily: 'sans-serif', justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
        <Text style = {{fontSize: 60, color: "#1B43E9", marginTop: 30}}>KouizMe</Text>
      </View>
      <View style={styles.imageContainer}>
        <Swiper showsButtons={false} paginationStyle ={{bottom: 0}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name = "apple-alt" size={200} color="grey" style = {{}}></FontAwesome>
            <Text style = {{fontSize: 25, color: "black", marginTop: 50, paddingHorizontal: 100, textAlign: "center"}}>KouizMe is the #1 quiz app</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name = "account" size={210} color="grey" style = {{}}></MaterialCommunityIcons>
            <Text style = {{fontSize: 25, color: "black", paddingHorizontal: 100, textAlign: "center"}}>Create an account to begin using KouizMe!</Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.signinContainer}>
        <AppButton title="Register" style={styles.loginContainer} onPress={() => navigation.navigate('Register')}/>
        <AppButton title="Log In" style={styles.loginContainer} onPress={() => navigation.navigate('Login')}/>
      </View>
    </View>
    );
  }


  const styles = StyleSheet.create({
    imageContainer: {
      flex: 7,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    signinContainer: {
      flex: 2,
      justifyContent: 'flex-end',
      justifyContent: 'space-around',
      backgroundColor: '#FBFBFD',
      paddingVertical: 40,
      paddingHorizontal: 50,
    },
    registerContainer: {
      elevation: 8,
      backgroundColor: 'orange',
      borderRadius: 200,
      paddingVertical: 12,
    },
    loginContainer: {
      elevation: 8,
      backgroundColor: 'orange',
      borderRadius: 200,
      paddingVertical: 10,
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    loginText: {
      fontWeight: "bold",
      alignSelf: "center",
      paddingVertical: 30
    },
    loginInput: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    }
  });