import React from "react";
import { View, Text, ScrollView, SafeAreaView, Modal, StyleSheet, Pressable, TextInput} from "react-native";

import AppButton from "../components/AppButton"


export default class QuizScreen extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            currentQuestion: 'Question',
            currentAnswer: '',
            questions: [],
            answers: [],
        }
      }

    onEnterNameText = (currentAnswer) => {
        this.setState({currentAnswer : currentAnswer});
    }

    checkAnswer = () =>
    {
    }


    render()
    {
    return(
        <View style={{flex: 1}}>
            <SafeAreaView>
                <ScrollView style = {{backgroundColor: 'lightskyblue'}}>
                    <View style={{flex: 1, alignItems: 'center', marginTop: 100, backgroundColor: 'lightskyblue'}}>
                        <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
                            <View style = {{padding: 20}}>
                                <Text style = {{fontSize: 20}}>{this.state.currentQuestion}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
                            <View style = {{padding: 20}}>
                                <TextInput placholder = "Answer" onChangeText={currentAnswer=> this.onEnterNameText(currentAnswer)} style = {{fontSize: 20}}>{this.state.currentAnswer}</TextInput>
                            </View>
                        </View>
                        <View style = {{flex: 1, justifyContent: "center", marginBottom: 50}}>
                            <AppButton AppButton title="Submit" style={styles.loginContainer} onPress={this.checkAnswer}></AppButton>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
