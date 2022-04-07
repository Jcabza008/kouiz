import React from "react";
import { View, Text, TextInput, StyleSheet} from "react-native";

import AppButton from "../components/AppButton.js"

export default class RegisterScreen extends React.Component
{

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style = {{justifyContent: 'center', justifyContent: 'space-around', paddingHorizontal: 20}}>
          <Text style = {styles.loginText}>SIGN UP WITH EMAIL AND PASSWORD</Text>
          <TextInput placeholder="Email" style={styles.loginInput}></TextInput>
          <TextInput placeholder="Password" style={styles.loginInput}></TextInput>
          <TextInput placeholder="Confirm Password" style={styles.loginInput}></TextInput>
          <View style = {{paddingVertical: 20}}>
            <AppButton title="REGISTER" style={styles.registerContainer} opacity= {0.6}/>
          </View>
          <Text style = {styles.loginText}>ALREADY HAVE AN ACCOUNT?</Text>
          <View style = {{paddingVertical: 20}}>
            <AppButton title="LOG IN" style={styles.loginContainer} onPress={() => this.props.navigation.navigate('Login')}/>
          </View>
        </View>
      </View>
    );
  }
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