import React from "react";

import {View, Text, TextInput, StyleSheet} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {default as KMServerClient, ClientReturnObj} from '../services/KMServerClient';
import UserLoginModel from '../services/Models'
import AppButton from "../components/AppButton"

export default class LoginScreen extends React.Component {
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
		if(this.state.opacityValue == 1) {
			let response = KMServerClient.loginUser(UserLoginModel = {
				username: this.state.UsernameInputValue,
				password: this.state.PasswordInputValue
			});
			if(response.error != null) {
				console.error(error);
			} else {
				this.props.navigation.navigate('UserHome');
			}
		}
	}

	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center'}}>
			<View style = {{justifyContent: 'center', justifyContent: 'space-around', paddingHorizontal: 20}}>
			<Text style = {styles.loginText}>LOG IN</Text>
			<TextInput placeholder="Username" onChangeText={UsernameInputValue=> this.onEnterUsernameText(UsernameInputValue)} style={styles.loginInput}></TextInput>
			{this.state.usernameError.length > 0 && <Text style = {styles.textDanger}>{this.state.usernameError}</Text>}
			<TextInput placeholder="Password" secureTextEntry={true} onChangeText={PasswordInputValue=> this.onEnterPasswordText(PasswordInputValue)} style={styles.loginInput}></TextInput>
			{this.state.passwordError.length > 0 && <Text style = {styles.textDanger}>{this.state.passwordError}</Text>}
			<View style = {{paddingVertical: 20, opacity: this.state.opacityValue}}>
				<AppButton title="LOG IN" opacity={this.state.buttonOpacity} onPress={() => this.props.navigation.navigate('UserHome')} style={{elevation: 8, backgroundColor: 'orange', borderRadius: 200, paddingVertical: 10,}}/>
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