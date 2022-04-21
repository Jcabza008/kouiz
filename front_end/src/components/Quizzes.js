import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Pressable} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as KMServerClient, ClientReturnObj} from '../services/KMServerClient';
import { QuizModel } from "../services/Models"

import AppButton from "../components/AppButton.js"




export default class Quizzes extends React.Component {
    constructor(props) {
        super(props)
        this.state = 
        {
            quizzes: [],
        }
    }
  
    addNewQuiz = (name) => 
    {
        this.setState(this.state.quizzes.addQuiz(name));
    }

    onPressDelete = (quizName) =>
    {
        let index;
        for (let i = 0; i < this.state.quizzes.length; i++)
        {
            if (quizName == this.state.quizzes[i].name)
                this.quizzes.splice(this.state.i, 1);
                index = i;
        }
        KMServerClient.deleteQuiz(this.state.quizzes[index].id)
        .then(response => {
            if(response.error != null) {
                console.error(response.error);
            } else {
                this.state.quizzes = response.response
            }
        });
    }

    onPressEdit = (quizName) =>
    {
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

    onPressQuiz = () =>
    {
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
        {quizName: tempQuiz.name, create: false, questions: 
        questions, answers: answers, index: Math.floor(math.random()*questions.length-1),
        correctAnswers: 0, wrongAnswers: 0});
    }

    componentDidMount()
    {
        KMServerClient.getQuizzes()
        .then(response => {
            if(response.error != null) {
                console.error(response.error);
            } else {
                this.state.quizzes = response.response
            }
        });
    }
    
    render()
    {
        let tempQuizzes = [];
        var Quiz = ({quizName}) => (
            <View style={{width: 300, height: 300, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
                <View style = {{flex: 2}}>
                    <Icon name = "delete" size={30} color="red" style = {{marginTop: 10, marginLeft: 260}} onPress = {this.onPressDelete(quizName)}></Icon>
                    <Text style = {{marginTop: 0, marginLeft: 35, marginRight: 35, fontWeight: 'bold', fontSize: 30}}>{quizName}</Text>
                </View>
                <View style = {{flex: 1, borderTopColor: "black", borderTopWidth: 2, marginLeft: 20, marginRight: 20, flexDirection: "row"}}>
                    <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                        <AppButton title = "Quiz" style={styles.loginContainer}  onPress = {this.onPressQuiz(quizName)}/>
                    </View>
                    <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                        <AppButton title = "Edit" style={styles.loginContainer} onPress = {this.onPressEdit(quizName)}/>
                    </View>
                </View>
            </View>
        );
        var Empty = () => (
            <View style = {{flex: 1, justifyContent: 'center'}}>
                <Text style = {{fontSize: 30, marginTop: 30}}>Empty</Text>
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
  });