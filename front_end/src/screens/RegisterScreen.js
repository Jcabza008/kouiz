import React from "react";
import { View, Text, TextInput, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { default as KMServerClient, ClientReturnObj} from '../services/KMServerClient';
import { UserRegisterModel, UserLoginModel } from "../services/Models"
import AppButton from "../components/AppButton.js"

export default class RegisterScreen extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			password: "",
			passwordError: "",
			username: "",
			firstname: "",
			lastname: "",
			confirmPassword: "",
			usernameError:"",
			firstnameError:"",
			lastnameError:"",
			confirmError:"",
			loading: false,
			isvisible: false
		}
    }

    formValidation = async () => {
		this.setState({loading:true})
		let errorFlag = false;

		this.setState({passwordError:""});
		this.setState({usernameError:""});
		this.setState({firstnameError:""});
		this.setState({lastnameError:""});
		this.setState({confirmError:""});

		if(this.state.username.length == 0){
			errorFlag = true;
			this.setState({usernameError:"Username has no input"});
		}

		if(this.state.firstname.length == 0){
			errorFlag = true;
			this.setState({firstnameError:"First name has no input"});
		}

		if(this.state.lastname.length == 0){
			errorFlag = true;
			this.setState({lastnameError:"Last name has no input"});
		}

		if(this.state.password.length == 0){
			errorFlag = true;
			this.setState({passwordError: "Password has no input"});
		}
		else if(this.state.password.length < 8){
			errorFlag = true;
			this.setState({passwordError: "Password should be at least 8 characters"});
		}

		if(this.state.confirmPassword.length == 0)
		{
			errorFlag = true;
			this.setState({confirmError:"Confirm password has no input"});
		}
		else if(this.state.confirmPassword != this.state.password)
		{
			errorFlag = true;
			this.setState({confirmError:"Password and confirm password should be the same"});
		}

		if(errorFlag){
			console.log("errorFlag");
		}
		else{

			this.setState({loading:false});

			KMServerClient.registerUser(new UserRegisterModel(
				this.state.username,
				this.state.firstname,
				this.state.lastname,
				this.state.password
			))
			.then(response => {
				if(response.error != null) {
        this.setState({usernameError:"Username has been taken or password is not valid."});
        this.setState({passwordError:"Password requires an uppercase character, lowercase character, number, and special character(!@#$)."});
				} else {
					KMServerClient.loginUser(new UserLoginModel(
						this.state.username,
						this.state.password
					)).then(response => {
						if(response.error != null) {
							console.error(response.error);
                            console.log("zz");
						} else {
							this.props.navigation.navigate('UserHome');
						}
					});
				}
			});
		}
 	}

    render() {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style = {{justifyContent: 'center', justifyContent: 'space-around', paddingHorizontal: 20}}>
            <Text style = {styles.loginText}>SIGN UP WITH EMAIL AND PASSWORD</Text>
            <TextInput placeholder="Username" style={styles.loginInput} onChangeText={username => this.setState({username})}></TextInput>
              {this.state.usernameError.length > 0 && <Text style = {styles.textDanger}>{this.state.usernameError}</Text>}
            <TextInput placeholder="First Name" style={styles.loginInput} onChangeText={firstname => this.setState({firstname})}></TextInput>
              {this.state.firstnameError.length > 0 && <Text style = {styles.textDanger}>{this.state.firstnameError}</Text>}
            <TextInput placeholder="Last Name" style={styles.loginInput} onChangeText={lastname => this.setState({lastname})}></TextInput>
              {this.state.lastnameError.length > 0 && <Text style = {styles.textDanger}>{this.state.lastnameError}</Text>}
            <TextInput placeholder="Password" secureTextEntry={true} style={styles.loginInput} onChangeText={password=> this.setState({password})}></TextInput>
              {this.state.passwordError.length > 0 && <Text style = {styles.textDanger}>{this.state.passwordError}</Text>}
            <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.loginInput} onChangeText={confirmPassword => this.setState({confirmPassword})}></TextInput>
              {this.state.confirmError.length > 0 && <Text style = {styles.textDanger}>{this.state.confirmError}</Text>}
            <View style = {{paddingVertical: 20}}>
              <AppButton title="REGISTER" style={styles.registerContainer} opacity= {0.6} onPress={() => this.formValidation()}/>
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
  modalContainer: {
    margin:20,
    backgroundColor:"white",
    borderRadius: 20,
    padding: 35,
    alignItems:"center",
  },
  registerContainer: {
    elevation: 8,
    backgroundColor: 'orange',
    borderRadius: 200,
    paddingVertical: 12,
  },
  okContainer: {
    elevation: 2,
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 10,
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