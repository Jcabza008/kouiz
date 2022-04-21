import React from "react";
import { View, Text, StyleSheet} from "react-native";

import AppButton from "../components/AppButton"


export default class AnswerScreen extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            correctAnswer: props.route.params.answer,
            yourAnswer: props.route.params.question,
            questions: props.route.params.questions,
            answers: props.route.params.answers,
            index: props.route.params.index,
            correctAnswers: props.route.params.correctAnswers,
            wrongAnswers: props.route.params.wrongAnswers
        }
      }

    onPressRight = () =>
    {
        this.state.questions.splice(this.state.index, 1);
        this.state.answers.splice(this.state.index, 1);
        this.props.navigation.navigate('Quiz', 
        {questions: this.state.questions, answers: this.state.answers, index: Math.floor(math.random()*questions.length-2),
        correctAnswers: this.state.correctAnswers + 1, wrongAnswers: this.state.wrongAnswers});
    }

    onpressWrong = () =>
    {
        this.props.navigation.navigate('Quiz', 
        {questions: this.state.questions, answers: this.state.answers, index: Math.floor(math.random()*questions.length-1),
        correctAnswers: this.state.correctAnswers, wrongAnswers: this.state.wrongAnswers + 1});
    }


    render()
    {
    return(
      <View style = {{flex: 1}}>
        <View style = {{flex: 5, alignItems: 'center', marginTop: 100}}>
            <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
              <View style = {{padding: 20}}>
                <Text style = {{fontSize: 25, color: 'black'}}>{CorrectAnswer}</Text>
                <Text style = {{fontSize: 22, color: 'green', marginTop: 10}}>{this.state.correctAnswer}</Text>
              </View>
            </View>
          </View>
        <View style = {{flex: 5, alignItems: 'center'}}>
          <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
            <View style = {{padding: 20}}>
                <Text style = {{fontSize: 25, color: 'black'}}>{yourAnswer}</Text>
                <Text style = {{fontSize: 22, color: 'red', marginTop: 10}}>{this.state.yourAnswer}</Text>
            </View>
          </View>
        </View>
        <View style = {{flex: 2, alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
          <AppButton AppButton title="Wrong" style={styles.wrong_button} onPress={this.onPressWrong}></AppButton>
          <AppButton AppButton title="Correct" style={styles.correct_button} onPress={this.onPressRight}></AppButton>
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
    wrong_button: {
        borderRadius: 100,
        backgroundColor: 'white',
        width: 150,
        borderWidth: 1,
        borderColor: 'red',
        padding: 20
      },
    correct_button: {
      borderColor: 'green',
      borderRadius: 100,
      width: 150,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'green',
      padding: 20,
      marginLeft: 20
    }
  });
