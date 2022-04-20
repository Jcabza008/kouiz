import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView} from "react-native";

import { default as KMServerClient, ClientReturnObj} from '../services/KMServerClient';
import { QuizModel, QuestionModel } from "../services/Models"

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppButton from "../components/AppButton"

export default class QuizEditor extends React.Component {
    constructor(props){
      super();
      this.state = {
        quizName: props.route.params.quizName,
        editName: true,
        currentQuestion: '',
        currentAnswer: '',
        questions: [],
        answers: [],
        prev: 0,
        index: 1,
        next: 0,
        totalLength: 0,
        createQuiz: props.route.params.create
      }
    }
  
    addQuestion = () =>
  {
    console.log(this.state.index)
    console.log(this.state.currentQuestion)
    if (this.state.questions[this.state.index-1] == null)
    {
      this.setState({prev: this.state.index});
      this.setState({index: this.state.index + 1});
      if (this.state.next != 0)
      {
        this.setState({next: this.state.next + 1});
      }
      this.state.questions.splice(this.state.index - 1, 0, this.state.currentQuestion);
      this.state.answers.splice(this.state.index - 1, 0, this.state.currentAnswer);
      this.setState({totalLength: this.state.totalLength + 1});
      this.setState({currentQuestion: ''});
      this.setState({currentAnswer: ''});
    }
    else
    {
      this.setState({prev: this.state.index});
      this.setState({index: this.state.index + 1});
            if (this.state.next != 0)
      {
        this.setState({next: this.state.next + 1});
      }
      this.state.questions[this.state.index-1] = this.state.currentQuestion;
      this.state.answers[this.state.index-1] = this.state.currentAnswer;
      this.setState({currentQuestion: ''});
      this.setState({currentAnswer: ''});
    }
    console.log(this.state.questions)
  }

  deleteQuestion = () =>
  {
    if(this.state.prev > 0)
    {
      this.state.questions.splice(this.state.index - 1,1);
      this.state.answers.splice(this.state.index - 1,1);
      this.setState({index: this.state.prev});
      if(this.state.next != 0)
      {
        this.setState({next: this.state.next - 1});
      }
      this.setState({currentAnswer: this.state.answers[this.state.index]});
      this.setState({currentQuestion: this.state.questions[this.state.index]});
      this.setState({prev: this.state.prev - 1})
    }
    else if(this.state.next > 0)
    {
      this.state.questions.splice(this.state.index - 1,1);
      this.state.answers.splice(this.state.index - 1,1);
      if(this.state.totalLength == this.state.next + 1)
      {
        this.setState({next: 0});
      }
      this.setState({currentAnswer: this.state.answers[this.state.index]});
      this.setState({currentQuestion: this.state.questions[this.state.index]});
    }
  }

    onPressEditIcon = () =>
    {
      this.setState({editName: false})
    }
  
    onPressFinishEdit = () =>
    {
      this.setState({editName: true})
    }

    onPressLeft = () =>
    {
      if(this.state.prev > 0)
       {
        this.setState({index: this.state.index - 1});
        this.setState({prev: this.state.prev - 1});
        if (this.state.index <= this.state.totalLength)
        {
          this.setState({next: this.state.index});
        }
        this.setState({currentQuestion: this.state.questions[this.state.index-2]});
        this.setState({currentAnswer: this.state.answers[this.state.index-2]});
       }
      // if(this.state.prev > 0)
      // {
      //   this.setState({index: this.state.index - 1});
      //   this.setState({prev: this.state.prev - 1});
      //   this.setState({next: this.state.index});
      //   this.setState({currentQuestion: this.state.questions[this.state.index-2]});
      //   this.setState({currentAnswer: this.state.answers[this.state.index-2]});
      //   if (this.state.index+1 > this.state.totalLength)
      //   {
      //     console.log(this.state.currentQuestion)
      //     this.state.questions.splice(this.state.index, 0, this.state.currentQuestion);
      //     this.setState({totalLength: this.state.totalLength + 1});
      //   }
      // }
      // console.log(this.state.questions)
    }

    onPressRight = () =>
    {
      if(this.state.next > 0)
      {
        this.setState({index: this.state.index + 1});
        this.setState({prev: this.state.prev + 1});
        if (this.state.next+1 < this.state.totalLength)
        {
          this.setState({next: this.state.next + 1});
        }
        else
        {
          this.setState({next: 0});
        }
        this.setState({currentQuestion: this.state.questions[this.state.index]});
        this.setState({currentAnswer: this.state.answers[this.state.index]});
      }
    }

    pressCreate = () => {
      console.log(this.state.createQuiz)
      if (this.state.createQuiz)
      {
        let questions = []
        for (let i = 0; i < this.state.totalLength; i++)
        {
          questions.push(new QuestionModel("", this.state.questions[i], this.state.answers[i], [], i))
        }
        KMServerClient.createQuiz(new QuizModel(
          "",
          "",
          this.state.quizName,
          questions
        ))
        .then(response => {
          if(response.error != null) {
          console.error(response.error);
          } else {
            this.props.navigation.navigate('Quizzes');
          }
        });
      }
      else
      {
      }
    }

    render()
    {

      let quizNameStatus;
      if (this.state.editName == true)
      {
        quizNameStatus=
          <View style = {{flexDirection: "row", borderWidth: 1, borderColor: "black", backgroundColor: "white"}}>
              <Text style = {{flex: 8, fontSize: 30, marginLeft: 10}}>{this.state.quizName}</Text>
              <FeatherIcon onPress={this.onPressEditIcon} name = "edit" size = {32} color = "red" style = {{flex: 1, padding: 5}}></FeatherIcon>
          </View>
      }
      if (this.state.editName == false)
      {
        quizNameStatus=
        <View style = {{flexDirection: "row", borderWidth: 1, borderColor: "black", backgroundColor: "white"}}>
          <TextInput onChangeText={quizName => this.setState({quizName: quizName})} style = {{flex: 8, fontSize: 30, marginLeft: 10}}>{this.state.quizName}</TextInput>
          <Ionicons onPress={this.onPressFinishEdit} name = "checkmark-circle" size = {32} color = "green" style = {{flex: 1, padding: 5}}></Ionicons>
        </View>
      }

      let quizQuestion = ''

      var Question = ({question, answer}) => (
        <ScrollView horizontal = {true}>
              <View style = {{flex: 2, width: 375, borderWidth: 1, marginRight: 20, marginLeft: 20, marginBottom: 50,backgroundColor: "white", elevation: 20}}>
                <TextInput multiline={true} placeholder="Enter Question" style = {{padding: 20, fontSize: 22}}
                onChangeText = {currentQuestion=> this.setState(({currentQuestion:currentQuestion}))}>{question}</TextInput>
              </View>
              <View style = {{flex: 2, width: 375, borderWidth: 1, paddingHorizontal: 20, marginRight: 20, marginLeft: 20,marginBottom: 50, backgroundColor: "white", elevation: 20}}>
                <TextInput multiline={true} placeholder="Enter Answer" style = {{padding: 20, fontSize: 22}}
                onChangeText = {currentAnswer=> this.setState(({currentAnswer:currentAnswer}))}>{answer}</TextInput>
              </View>
        </ScrollView>
      );

      let p = this.state.prev;
      let n = this.state.next;

      if(this.state.prev == 0)
      {
        p = '';
      }
      if(this.state.next == 0)
      {
        n = '';
      }

      //quizQuestion.push(Question({question: this.state.currentQuestion, answer: this.state.currentAnswer}));
      quizQuestion = Question({question: this.state.currentQuestion, answer: this.state.currentAnswer});
      return(
        <View style = {{flex: 1, backgroundColor: "#FBFBFD"}}>
          <View style = {{flex: 1, borderBottomWidth: 3, paddingVertical: 10, backgroundColor: "white"}}>
          </View>
          <View style = {{flex: 2, paddingHorizontal: 20, marginTop: 20}}>
            {quizNameStatus}
          </View>
          <View style = {{flex: 10, flexDirection: "row"}}>
            {quizQuestion}
          </View>
          <View style = {{flex: 5, alignItems: 'center', flexDirection: "row", paddingHorizontal: 20}}>
            <View style = {{flex: 1, alignItems: 'center'}}>
              <Ionicons name = "arrow-back-circle" size = {50} color = "grey" onPress = {() => this.onPressLeft()}></Ionicons>
            </View>
            <View style = {{flex: 4, alignItems: 'center'}}>
              <View style = {{flex: 1, flexDirection: "row"}}>
                <AntDesign name = "minuscircle" size = {50} color = "red" style = {{padding: 20}} onPress={() => this.deleteQuestion()} >
                </AntDesign>
                <AntDesign name = "pluscircle" size = {50} color = "green" style = {{padding: 20}} onPress={() => this.addQuestion()}>
                </AntDesign>
              </View>
              <View>
                <Text style = {{fontSize: 20}}>{p}..{this.state.index}..{n}</Text>
              </View>
              <View style = {{marginTop: 20, marginBottom: 10}}>
                <AppButton title = "Submit" style={styles.loginContainer} onPress = {this.pressCreate}/>
              </View>
            </View>
            <View style = {{flex: 1, alignItems: 'center'}}>
              <Ionicons name = "arrow-forward-circle" size = {50} color = "grey" onPress = {() => this.onPressRight()}></Ionicons>
            </View>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    add_question: {
      backgroundColor: 'green',
      borderRadius: 200,
      paddingVertical: 10,
      width: '60%',
      marginBottom: 20,
      elevation: 20
      
    },
    delete_question: {
      backgroundColor: 'red',
      borderRadius: 200,
      paddingVertical: 10,
      width: '60%',
      marginBottom: 20,
      elevation: 20
    },
    loginContainer: {
      borderRadius: 100,
      padding: 15,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'green',
    },
  });