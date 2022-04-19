import React from "react";
import { View, Text, TextInput, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from "../components/AppButton.js"

export const backendCookie = {
  VALUE: "backend",
}
export default class RegisterScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errorMessage: "",
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

    this.setState({errorMessage:""});
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
      this.setState({errorMessage: "Password has no input"});
    }
    else if(this.state.password.length < 8){
      errorFlag = true;
      this.setState({errorMessage: "Password should be at least 8 characters"});
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

      /*
      try {
        await AsyncStorage.setItem("bob","b");
      }
      catch (error){
        console.log(error);
      }

      try {
        const v = await AsyncStorage.getItem("bob");
        if(v != null)
        {
          console.log(v);
        }
        else{
          console.log("it is null");
        }
      }
      catch (error){
        console.log(error);
      }
      */
      // console.log(this.state.username);
      // if(this.state.Accountuser.length > 0)
      // {
      //   for(var i = 0;i < this.state.Accountuser.length;i++)
      //   {
      //     console.log(this.state.Accountuser[i]);
      //     if(this.state.username == this.state.Accountuser[i])
      //     {
      //       errorFlag = true;
      //       this.setState({usernameError:"There is already an account with that username"});
      //       break;
      //     }
      //     else if(i == this.state.Accountuser.length - 1)
      //     {
      //       this.setState({Accountuser: [...this.state.Accountuser, this.state.username]});
      //       this.setState({Accountpass: [...this.state.Accountpass, this.state.password]});
      //       this.setState({isvisible: true});
      //     }
      //   }
      // }
      // else
      // {
      //   this.setState({Accountuser: [...this.state.Accountuser, this.state.username]});
      //   this.setState({Accountpass: [...this.state.Accountpass, this.state.password]});
      //   this.setState({isvisible:true});
      // }

      // u = this.state.Accountuser;
      // p = this.state.Accountpass;

      /*
      fetch('http://192.168.1.2:5000/api/Quizzes',{
      method: 'POST',
      body: JSON.stringify({
        "ownerID": "steven",
        "name": "stv",
        "questions": [
          {
            "prompt": "asd",
            "answer": "zzz",
            "order": 1
          }
        ]
      }),
      headers: {
        'accept' : 'text/plain',
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => {
        console.error(error);
      })
      console.log("1");
      */


      fetch('http://192.168.1.2:5000/api/Auth',{
        method: 'POST',
        body: JSON.stringify({
          "username": this.state.username,
          "firstname": this.state.firstname,
          "lastname": this.state.lastname,
          "password": this.state.password
        }),
        headers: {
          'accept' : 'text/plain',
          'Content-type': 'application/json'
        }
      })
      //.then((response) => AsyncStorage.setItem(backendCookie,response.headers.get("set-cookie")))
      .then((response) => response.json())
      .then((responsejson) => {
        console.log(responsejson);
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
        this.setState({usernameError:"Username has been taken"});
      })
      //console.log(await AsyncStorage.getItem(backendCookie));


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
            {this.state.usernameError.length > 0 && <Text style = {styles.textDanger}>{this.state.usernameError}</Text>}
          <TextInput placeholder="Last Name" style={styles.loginInput} onChangeText={lastname => this.setState({lastname})}></TextInput>
            {this.state.usernameError.length > 0 && <Text style = {styles.textDanger}>{this.state.usernameError}</Text>}
          <TextInput placeholder="Password" style={styles.loginInput} onChangeText={password=> this.setState({password})}></TextInput>
            {this.state.errorMessage.length > 0 && <Text style = {styles.textDanger}>{this.state.errorMessage}</Text>}
          <TextInput placeholder="Confirm Password" style={styles.loginInput} onChangeText={confirmPassword => this.setState({confirmPassword})}></TextInput>
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