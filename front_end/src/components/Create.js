import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView} from "react-native";

import {AppButton} from "../components/AppButton.js"

export default class Create extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        createQuiz: true,
        NameInputValue: '',
        opacityValue: 0.6,
        buttonOpacity: 1
      }
    }
  
    onEnterNameText = (NameInputValue) => {
      this.setState({NameInputValue : NameInputValue});
      if (!(this.state.NameInputValue == ""))
        this.setState({opacityValue: 1, buttonOpacity: 0.6})
      else
        this.setState({opacityValue: 0.6, buttonOpacity: 1})
    }
    setOpacity =() => {
      this.setState({opacityValue: 1})
    }
  
    pressCreate = () => {
      if (this.state.opacityValue == 1)
        this.props.navigation.navigate('QuizEditor')
        this.setState({opacityValue: 0.6, createQuiz: true, nameInputValue: ''})
    }
  
    render()
    {
      return(
      <View style = {{flex: 1, justifyContent: "center", backgroundColor: 'lightskyblue'}}>
        <View style = {{flex: 5, justifyContent: "center"}}>
          <Text style = {{textAlign: "center", fontSize: 50, fontFamily: 'sans-serif', textShadowColor: "grey", textShadowRadius: 20}}>Create a new Quiz!</Text>
        </View>
        <View style = {{flex: 1, justifyContent: "center", paddingHorizontal: 50}}>
        <TextInput placeholder="Quiz Name" onChangeText={NameInputValue=> this.onEnterNameText(NameInputValue)} style={styles.loginInput}></TextInput>
        </View>
        <View style = {{flex: 2, justifyContent: "center", paddingHorizontal: 50, opacity: this.state.opacityValue}}>
          <AppButton AppButton title="Create" opacity={this.state.buttonOpacity} style={styles.loginContainer} onPress={() => this.pressCreate()}></AppButton>
        </View>
        <View style = {{flex: 3, justifyContent: "center", paddingHorizontal: 50}}>
        <AppButton AppButton title="View Quizzes" style={styles.loginContainer} onPress={() => this.props.navigation.navigate('Quizzes')}></AppButton>
        </View>
        <View style = {{flex: 4}}></View>
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