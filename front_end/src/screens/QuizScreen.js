import React from "react";
import { View, Text, StyleSheet, TextInput} from "react-native";

import AppButton from "../components/AppButton"


export default class QuizScreen extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            currentAnswer: '',
            questions: props.route.params.questions,
            answers: props.route.params.answers,
            index: props.route.params.index,
            correctAnswers: props.route.params.correctAnswers,
            wrongAnswers: props.route.params.correctQuestions
        }
      }

    onEnterNameText = (currentAnswer) => {
        this.setState({currentAnswer : currentAnswer});
    }

    checkAnswer = () =>
    {
        if (this.state.questions.length == 1)
        {
            if (this.state.currentAnswer == this.state.answers[this.state.index])
            {
                this.props.navigation('complete',
                {correctAnswers: this.state.correctAnswers + 1, wrongAnswers: this.state.wrongAnswers})
            }
            else
            {
                this.props.navigation('complete',
                {correctAnswers: this.state.correctAnswers, wrongAnswers: this.state.wrongAnswers + 1})
            }
        }
        else if (this.state.currentAnswer == this.state.answers[this.state.index])
        {
            this.questions.splice(this.state.index, 1);
            this.setState({index: Math.floor(math.random()*questions.length-2), correctAnswers: this.state.correctAnswers + 1});
        }
        else
        {
            this.props.navigation.navigate('Answer', 
            {answer: this.state.questions[this.state.index], question: this.state.questions[index], 
            questions: this.state.questions, answers: this.state.answers, index: this.state.index,
            correctAnswers: this.state.correctAnswers, wrongAnswers: this.state.wrongAnswers});
        }
    }

    render()
    {
    return(
      <View style = {{flex: 1}}>
        <View style = {{flex: 5, alignItems: 'center', marginTop: 100}}>
            <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
              <View style = {{padding: 20}}>
                <Text style = {{fontSize: 22}}>{this.state.questions[this.state.index]}</Text>
              </View>
            </View>
          </View>
        <View style = {{flex: 5, alignItems: 'center'}}>
          <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
            <View style = {{padding: 20}}>
              <TextInput placholder = "Answer" onChangeText={currentAnswer=> this.onEnterNameText(currentAnswer)} style = {{fontSize: 22}}>{this.state.currentAnswer}</TextInput>
            </View>
          </View>
        </View>
        <View style = {{flex: 2, alignItems: 'center', marginTop: 30}}>
          <AppButton AppButton title="Submit" style={styles.submit_button} onPress={this.checkAnswer}></AppButton>
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
    submit_button: {
      borderColor: 'green',
      borderRadius: 100,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'green',
      padding: 20
    },
  });
