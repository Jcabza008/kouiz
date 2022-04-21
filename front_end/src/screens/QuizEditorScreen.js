import React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView} from "react-native";

import { default as KMServerClient} from '../services/KMServerClient';
import { QuizModel, QuestionModel } from "../services/Models"

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppButton from "../components/AppButton"

export default class QuizEditor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            quizName: props.route.params.quizName,
            editName: true,
            questions: props.route.params.questions,
            answers: props.route.params.answers,
            index: 1,
            createQuiz: props.route.params.create
        }
    }

    addQuestion = () => {
        this.state.questions.splice(this.state.index, 0, '');
        this.state.answers.splice(this.state.index, 0, '');
        this.setState({index: this.state.index + 1});
    }

    deleteQuestion = () => {
        if (this.state.index > 1)
        {
            this.state.questions.splice(this.state.index - 1,1);
            this.state.answers.splice(this.state.index - 1,1);
            this.setState({index: this.state.index - 1});
        }
    }

    onPressLeft = () => {
        if (this.state.index > 1)
        {
            this.setState({index: this.state.index - 1});
        }
    }

    onPressRight = () => {
        if (this.state.index < this.state.questions.length)
        {
            this.setState({index: this.state.index + 1});
        }
    }

    onChangeQuestion = (question) => {
        this.setState({currentQuestion: question});
        this.state.questions[this.state.index-1] = question;
    }

    onChangeAnswer = (answer) => {
        this.setState({currentAnswer: answer});
        this.state.answers[this.state.index-1] = answer;
    }

    onPressEditIcon = () => {
      this.setState({editName: false})
    }

    onPressFinishEdit = () => {
      this.setState({editName: true})
    }

    pressCreate = () =>  {
        let questions = []
        for (let i = 0; i < this.state.questions.length; i++)
        {
            questions.push(new QuestionModel("", this.state.questions[i], this.state.answers[i], [], i))
        }
        if (this.state.createQuiz)
        {
            KMServerClient.createQuiz(new QuizModel(
                "",
                "",
                this.state.quizName,
                questions
            )).then(response => {
                if(response.error != null) {
                    console.error(response.error);
                } else {
                    this.props.navigation.navigate('Quizzes');
                }
            });
        }
        else
        {
            KMServerClient.updateQuiz(new QuizModel(
                "",
                "",
                this.state.quizName,
                questions
            )).then(response => {
                if(response.error != null) {
                    console.error(response.error);
                } else {
                    this.props.navigation.navigate('Quizzes');
                }
            });
        }
    }

    render() {
        let p;
        let n;

        //update previous
        if (this.state.index > 1)
        {
            p = this.state.index - 1;
        }
        else
        {
            p = '';
        }

        //update next
        if (this.state.questions.length > this.state.index)
        {
            n = this.state.index + 1;
        }
        else
        {
            n = '';
        }

        let quizNameStatus;

        if (this.state.editName == true) {
            quizNameStatus=
                <View style = {{flexDirection: "row", borderWidth: 1, borderColor: "black", backgroundColor: "white"}}>
                    <Text 
                        style = {{flex: 8, fontSize: 30, marginLeft: 10}}>{this.state.quizName}
                    </Text>
                    <FeatherIcon 
                        onPress={this.onPressEditIcon} 
                        name = "edit" size = {32} color = "red" 
                        style = {{flex: 1, padding: 5}}>
                    </FeatherIcon>
                </View>
        }

        if (this.state.editName == false) {
            quizNameStatus=
            <View style = {{flexDirection: "row", borderWidth: 1, borderColor: "black", backgroundColor: "white"}}>
                <TextInput 
                    onChangeText={quizName => this.setState({quizName: quizName})} 
                    style = {{flex: 8, fontSize: 30, marginLeft: 10}}>
                    {this.state.quizName}
                </TextInput>
                <Ionicons 
                    onPress={this.onPressFinishEdit} 
                    name = "checkmark-circle" 
                    size = {32} color = "green" 
                    style = {{flex: 1, padding: 5}}>
                 </Ionicons>
            </View>
        }

        let quizQuestion = ''

        var Question = ({question, answer}) => (
            <ScrollView horizontal = {true}>
                <View style = {{flex: 2, width: 375, borderWidth: 1, marginRight: 20, marginLeft: 20, marginBottom: 50,backgroundColor: "white", elevation: 20}}>
                    <TextInput 
                        multiline={true} 
                        placeholder="Enter Question" 
                        style = {{padding: 20, fontSize: 22}}
                        onChangeText = {question => this.onChangeQuestion(question)}>
                        {question}
                    </TextInput>
                </View>

                <View style = {{flex: 2, width: 375, borderWidth: 1, paddingHorizontal: 20, marginRight: 20, marginLeft: 20,marginBottom: 50, backgroundColor: "white", elevation: 20}}>
                    <TextInput 
                        multiline={true} 
                        placeholder="Enter Answer" 
                        style = {{padding: 20, fontSize: 22}}
                        onChangeText = {answer => this.onChangeAnswer(answer)}>
                        {answer}
                    </TextInput>
                </View>
            </ScrollView>
        );

        quizQuestion = Question({question: this.state.questions[this.state.index-1], answer: this.state.answers[this.state.index-1]});

        return(
            <View style = {{flex: 1, backgroundColor: "#FBFBFD"}}>
                <View style = {{flex: 1, borderBottomWidth: 3, paddingVertical: 10, backgroundColor: "white"}}></View>
                <View style = {{flex: 2, paddingHorizontal: 20, marginTop: 20}}>
                    {quizNameStatus}
                </View>

                <View style = {{flex: 10, flexDirection: "row"}}>
                    {quizQuestion}
                </View>

                <View style = {{flex: 5, alignItems: 'center', flexDirection: "row", paddingHorizontal: 20}}>
                    <View style = {{flex: 1, alignItems: 'center'}}>
                        <Ionicons 
                            name = "arrow-back-circle" 
                            size = {50} color = "grey" 
                            onPress = {() => this.onPressLeft()}>
                        </Ionicons>
                    </View>

                    <View style = {{flex: 4, alignItems: 'center'}}>
                        <View style = {{flex: 1, flexDirection: "row"}}>
                                <AntDesign 
                                    name = "minuscircle" 
                                    size = {50} color = "red" 
                                    style = {{padding: 20}} 
                                    onPress={() => this.deleteQuestion()}>
                                </AntDesign>
                                <AntDesign 
                                    name = "pluscircle" 
                                    size = {50} color = "green" 
                                    style = {{padding: 20}} 
                                    onPress={() => this.addQuestion()}>
                                </AntDesign>
                        </View>

                        <View>
                            <Text style = {{fontSize: 20}}>{p}...{this.state.index}...{n}</Text>
                        </View>
                        
                        <View style = {{marginTop: 20, marginBottom: 10}}>
                            <AppButton title = "Submit" style={styles.submit_button} onPress = {this.pressCreate}/>
                        </View>
                    </View>
                    <View style = {{flex: 1, alignItems: 'center'}}>
                        <Ionicons 
                            name = "arrow-forward-circle" 
                            size = {50} color = "grey" 
                            onPress = {() => this.onPressRight()}>
                        </Ionicons>
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
    submit_button: {
      borderRadius: 100,
      padding: 15,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'green',
    },
  });