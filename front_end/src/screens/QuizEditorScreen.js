import React from "react";
import { View, Text, TextInput, StyleSheet} from "react-native";
import Swiper from 'react-native-swiper'

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppButton from "../components/AppButton"

export default class QuizEditor extends React.Component {
    constructor(){
      super();
      this.state = {
        quizName: 'Quiz Name',
        editName: true,
        currentQuestion: '',
        currentAnswer: '',
        questions: [],
        answers: [],
        prev: 0,
        index: 1,
        next: 0,
        totalLength: 0
      }
    }
  
    addQuestion = () =>
  {
	  //push index to prev array
    this.setState({ prev: this.state.index});
    this.setState({index: this.state.index + 1});
	  //set index to index + 1
	  //push "Enter Question" to questions array
    this.setState({questions: [...this.state.questions, this.state.currentQuestion]});
	  //push "Enter Answer" to answers array
    this.setState({answers: [...this.state.answers, this.state.currentAnswer]});
	  //this.setState({this.state.prev.push(index), index: index + 1})
    this.setState({totalLength: this.state.totalLength + 1});
    this.setState({currentQuestion: ''});
    this.setState({currentAnswer: ''});
  }

  deleteQuestion = () =>
  {
    //if prev is not empty
      //delete questions[index] and answers[index]
      //set prev[end] to index
      console.log(this.state.questions);
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
    }
    else if(this.state.next.length > 0)
    {
      this.state.questions.splice(this.state.index - 1,1);
      this.state.answers.splice(this.state.index - 1,1);
      if(totalLength > next)
      {
        this.setState({next: this.state.next - 1});
      }
      else
      {
        this.setState({next: 0});
      }
      this.setState({currentAnswer: this.state.answers[this.state.index]});
      this.setState({currentQuestion: this.state.questions[this.state.index]});
    }
    console.log(this.state.questions);
    //else if next is not empty
      //delete questions[index] and answers[index]
      //set next[0] to index
    //else
      //display error can't delete last question
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
        console.log(this.state.totalLength)
        console.log(this.state.next)
        if(this.state.index + 1 <= this.state.totalLength)
        {
          this.setState({next: this.state.index + 1});
        }
        this.setState({currentQuestion: this.state.questions[this.state.index - 1]});
        this.setState({currentAnswer: this.state.answers[this.state.index - 1]});
      }
    }

    onPressRight = () =>
    {
      console.log(this.state.totalLength)
      if(this.state.next > 0 && this.state.next < this.state.totalLength)
      {
        this.setState({index: this.state.index + 1});
        this.setState({prev: this.state.prev + 1});
        this.setState({next: this.state.next + 1});
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
        <Swiper>
              <View style = {{flex: 1, borderWidth: 1, marginRight: 20, marginLeft: 20, marginBottom: 50,backgroundColor: "white", elevation: 20}}>
                <TextInput placeholder="Enter Question" style = {{padding: 20}}
                onChangeText = {currentQuestion=> this.setState(({currentQuestion:currentQuestion}))}>{question}</TextInput>
              </View>
              <View style = {{flex: 1, borderWidth: 1, paddingHorizontal: 20, marginRight: 20, marginLeft: 20,marginBottom: 50, backgroundColor: "white", elevation: 20}}>
                <TextInput placeholder="Enter Answer" style = {{padding: 20}}
                onChangeText = {currentAnswer=> this.setState(({currentAnswer:currentAnswer}))}>{answer}</TextInput>
              </View>
           </Swiper>
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
        <View style = {{flex: 1, backgroundColor: "lightskyblue"}}>
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
              <Ionicons name = "arrow-back-circle" size = {50} color = "green" onPress = {() => this.onPressLeft()}></Ionicons>
            </View>
            <View style = {{flex: 4, alignItems: 'center'}}>
              <AppButton title="Add" style={styles.add_question} onPress={() => this.addQuestion()} >
              </AppButton>
              <View>
              <AppButton title="Delete" styles={styles.delete_question} onPress={() => this.deleteQuestion()}>
              </AppButton>
            </View>
              <View style = {{marginTop: 30, marginBottom: 10}}>
                <Text style = {{fontSize: 20}}>{p}</Text>
                <Text style = {{fontSize: 20}}>..{this.state.index}..{n}</Text>
              </View>
              <Ionicons name = "checkmark-circle" size = {50} color = "green" style={{marginLeft: 5}}></Ionicons>
            </View>
            <View style = {{flex: 1, alignItems: 'center'}}>
              <Ionicons name = "arrow-forward-circle" size = {50} color = "green" onPress = {() => this.onPressRight()}></Ionicons>
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
  });