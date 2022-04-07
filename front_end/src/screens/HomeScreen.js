import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import Swiper from 'react-native-swiper'

import AppButton from "../components/AppButton.js"


export default function HomeScreen ({navigation}){
    return (
    <View style = {{flex: 1, color: 'white'}}>
      <View style={{flex: 2, paddingVertical: 10}}>
        <Image source = {require('../assets/home_screen_logo.png')}
          style = {{width: 425, height: 155, resizeMode: 'contain'}}/>
      </View>
      <View style={styles.imageContainer}>
        <Swiper showsButtons={false}>
          <View style={{justifyContent: 'center'}}>
            <Image source = {require('../assets/create_account.png')}
            style = {{width: 408, height: '90%', resizeMode: 'contain'}}/>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginTop: 200}}>Banana</Text>
          </View><View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginTop: 200}}>Turtle</Text>
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
    },
    signinContainer: {
      flex: 2,
      justifyContent: 'flex-end',
      justifyContent: 'space-around',
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