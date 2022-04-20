import React from "react";
import { View, Text, ScrollView, SafeAreaView, Modal, StyleSheet, Pressable} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as KMServerClient, ClientReturnObj} from '../services/KMServerClient';
import { QuizModel } from "../services/Models"

import AppButton from "../components/AppButton.js"

export default class Quizzes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quizzes: [],
            deleteQuiz: false
        }
    }
  
    addNewQuiz = (name) => {
        this.setState(this.state.quizzes.addQuiz(name));
    }

    onPressDelete = () => {
        this.setState({deleteQuiz: true});
    }

    deleteQuiz = () => {
        this.setState({deleteQuiz: false});
    }

    hideDelete = () => {
        this.setState({deleteQuiz: false});
    }

    onPressEdit = (quizName) => {
        let tempQuiz;
        for (let i = 0; i < this.state.quizzes.length; i++)
        {
            if (quizName == this.state.quizzes[i].name)
                tempQuiz = this.state.quizzes[i]
        }

        let questions = [];
        let answers = [];

        for (let i = 0; i < tempQuiz.questions.length; i++)
        {
            questions.push(tempQuiz.questions[i].prompt);
            answers.push(tempQuiz.questions[i].answer);
        }

        this.props.navigation.navigate('QuizEditor',
        {quizName: tempQuiz.name, create: false, questions: questions, answers: answers});
    }

    onPressQuiz = () => {

        let tempQuiz;
        for (let i = 0; i < this.state.quizzes.length; i++)
        {
            if (quizName == this.state.quizzes[i].name)
                tempQuiz = this.state.quizzes[i]
        }

        let questions = [];
        let answers = [];

        for (let i = 0; i < tempQuiz.questions.length; i++)
        {
            questions.push(tempQuiz.questions[i].prompt);
            answers.push(tempQuiz.questions[i].answer);
        }

        this.props.navigation.navigate('Quiz',
        {quizName: tempQuiz.name, create: false, questions: questions, answers: answers, index: Math.floor(math.random()*questions.length-1)});
    }

    componentDidMount() {
        KMServerClient.getQuizzes()
        .then(response => {
            if(response.error != null) {
                console.error(response.error);
            } else {
                this.state.quizzes = response.response
            }
        });
    }
    
    render() {
      
        let tempQuizzes = [];
        var Quiz = ({quizName}) => (
            <View style={{width: 300, height: 300, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>

                <View style = {{flex: 2}}>
                    <Icon 
                      name = "delete"
                      size={30} 
                      color="red" 
                      style = {{marginTop: 10, marginLeft: 260}} 
                      onPress = {this.onPressDelete}>
                    </Icon>
                    <Text 
                      style = {{marginTop: 0, marginLeft: 35, marginRight: 35, fontWeight: 'bold', fontSize: 30}}>
                      {quizName}
                    </Text>
                </View>

                <View style = {{flex: 1, borderTopColor: "black", borderTopWidth: 2, marginLeft: 20, marginRight: 20, flexDirection: "row"}}>

                    <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                        <AppButton 
                        title = "Quiz" 
                        style={styles.loginContainer}  
                        onPress = {this.onPressQuiz(quizName)}>
                        </AppButton>
                    </View>

                    <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                        <AppButton 
                        title = "Edit" 
                        style={styles.loginContainer} 
                        onPress = {this.onPressEdit(quizName)}>
                        </AppButton>
                    </View>

                </View>

            </View>
        );
        var Empty = () => (
            <View style = {{flex: 1, justifyContent: 'center'}}>
                <Text style = {{fontSize: 30}}>Empty</Text>
            </View>

        );
        if (this.state.quizzes.size == 0)
        {
            tempQuizzes.push(Empty());
        }
        else
        {
            for (var i = 0; i < this.state.quizzes.length; i++)
            {
                tempQuizzes.push(Quiz({quizName: this.state.quizzes[i].name}));
            }
        }
  
      return( 
        <SafeAreaView>
          <ScrollView style = {{backgroundColor: '#FBFBFD'}}>

            <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
              <Modal animationType="slide" transparent={true} visible={this.state.deleteQuiz}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>

                    <Text style={styles.modalText}>Are you sure?</Text>

                    <View style = {{flexDirection: "row", padding: 20}}>

                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.deleteQuiz()}
                      >
                      <Text style={styles.textStyle}>Yes</Text>
                      </Pressable>

                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.hideDelete()}
                      >
                      <Text style={styles.textStyle}>No</Text>
                      </Pressable>

                    </View>

                  </View>
                </View>
              </Modal>
              {tempQuizzes}
            </View>

          </ScrollView>
        </SafeAreaView>
      );
    }
  }

  const styles = StyleSheet.create({
    loginContainer: {
      borderRadius: 200,
      height: 40,
      width: 100,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'blue',
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 20,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20
    }
  });