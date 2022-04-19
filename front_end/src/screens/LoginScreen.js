import React from "react";

import {View, Text, TextInput, StyleSheet} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendCookie} from "./RegisterScreen";
import AppButton from "../components/AppButton"

export default class LoginScreen extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      UsernameInputValue: '',
      PasswordInputValue: '',
      usernameError: '',
      passwordError: '',
      opacityValue: 0.6,
      buttonOpacity: 1
    }
  }

  onEnterUsernameText = (UsernameInputValue) => {
    this.setState({UsernameInputValue : UsernameInputValue});
    if (!(this.state.PasswordInputValue == ""))
      this.setState({opacityValue: 1, buttonOpacity: 0.6})
    else
      this.setState({opacityValue: 0.6, buttonOpacity: 1})
  }

  onEnterPasswordText = (PasswordInputValue) => {
    this.setState({PasswordInputValue : PasswordInputValue})
    if (!(this.state.UsernameInputValue == ""))
      this.setState({opacityValue: 1, buttonOpacity: 0.6})
    else
      this.setState({opacityValue: 0.6, buttonOpacity: 1})
  }

  setOpacity =() => {
    this.setState({opacityValue: 1})
  }

  pressLogin = async () => {
    /*
    this.setState({usernameError:""});
    this.setState({passwordError:""});
    */
    if(this.state.opacityValue == 1)
    {

      fetch('http://192.168.1.2:5000/api/Auth',{
        method: 'PUT',
        body: JSON.stringify({
          "username": this.state.UsernameInputValue,
          "password": this.state.PasswordInputValue
        }),
        headers: {
          'accept' : 'text/plain',
          'Content-type': 'application/json'
        }
      })
      .then(response => {
        if(!response.ok) {
          console.error("Wrong username or password");
        } else {
          AsyncStorage.setItem(backendCookie.VALUE,response.headers.get("set-cookie"))
          this.props.navigation.navigate('UserHome');
        }
      });
      //.then((response) => response.json())
      //.then((responsejson) => {
        //console.log(responsejson);
      //})
      //this.props.navigation.navigate('UserHome');
    }

      /*
      for(var i = 0;i < u.length;i++)
      {
        console.log(this.state.UsernameInputValue);
        console.log(u[i]);
        if(this.state.UsernameInputValue == u[i])
        {
          if(this.state.PasswordInputValue == p[i])
          {
            this.props.navigation.navigate('UserHome');
          }
          else
          {
            this.setState({passwordError:"The password is not correct"});
            break;
          }
        }
        else if(i == u.length - 1)
        {
          errorFlag = true;
            this.setState({usernameError:"The username is not correct"});
            break;
        }
      }
    }
    else
    {
      if(this.state.UsernameInputValue.length == 0)
      {
        this.setState({usernameError:"Please input the username"});
      }

      if(this.state.PasswordInputValue.length == 0)
      {
        this.setState({PasswordInputValue:"Please input the password"});
      }
    }
    */
  }

  render() {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
        <View style = {{justifyContent: 'center', justifyContent: 'space-around', paddingHorizontal: 20}}>
          <Text style = {styles.loginText}>LOG IN</Text>
          <TextInput placeholder="Username" onChangeText={UsernameInputValue=> this.onEnterUsernameText(UsernameInputValue)} style={styles.loginInput}></TextInput>
          {this.state.usernameError.length > 0 && <Text style = {styles.textDanger}>{this.state.usernameError}</Text>}
          <TextInput placeholder="Password" onChangeText={PasswordInputValue=> this.onEnterPasswordText(PasswordInputValue)} style={styles.loginInput}></TextInput>
          {this.state.passwordError.length > 0 && <Text style = {styles.textDanger}>{this.state.passwordError}</Text>}
          <View style = {{paddingVertical: 20, opacity: this.state.opacityValue}}>
            <AppButton title="LOG IN" opacity={this.state.buttonOpacity} onPress={() => {this.pressLogin()}} style={{elevation: 8, backgroundColor: 'orange', borderRadius: 200, paddingVertical: 10,}}/>
          </View>
          <Text style = {styles.loginText}>DON'T HAVE AN ACCOUNT?</Text>
          <View style = {{paddingVertical: 20}}>
            <AppButton title="REGISTER" style={styles.loginContainer} onPress={() => this.props.navigation.navigate('Register')}/>
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
  },
  textDanger:{
    color : "#dc3545"
  }
});