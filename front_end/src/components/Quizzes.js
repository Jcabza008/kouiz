import React from "react";
import { View, Text, ScrollView, SafeAreaView, Modal, StyleSheet, Pressable} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppButton from "../components/AppButton.js"


export default class Quizzes extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        quizzes: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5",],
        deleteQuiz: false
      }
    }
  
  
    addNewQuiz = (name) => 
    {
      this.setState(this.state.quizzes.addQuiz(name))
    }

    onPressDelete = () =>
    {
      this.setState({deleteQuiz: true})
    }

    hideDelete = () =>
    {
      this.setState({deleteQuiz: false})
    }

    onPressEdit = () =>
    {
      this.props.navigation.navigate('QuizEditor')
    }

    onPressQuiz = () =>
    {
      this.props.navigation.navigate('Quiz')
    }
  
    
    render()
    {
      let tempQuizzes = []
      var Quiz = ({quizName}) => (
        <View style={{width: 300, height: 300, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
            <View style = {{flex: 2}}>
              <Icon name = "delete" size={30} color="red" style = {{marginTop: 10, marginLeft: 260}} onPress = {this.onPressDelete}></Icon>
              <Text style = {{marginTop: 0, marginLeft: 35, marginRight: 35, fontWeight: 'bold', fontSize: 30}}>{quizName}</Text>
            </View>
            <View style = {{flex: 1, borderTopColor: "black", borderTopWidth: 2, marginLeft: 20, marginRight: 20, flexDirection: "row"}}>
            <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
              <AppButton title = "Quiz" style={styles.loginContainer}  onPress = {this.onPressQuiz}/>
            </View>
            <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
              <AppButton title = "Edit" style={styles.loginContainer} onPress = {this.onPressEdit}/>
            </View>
          </View>
        </View>
      );
  
      for (var i = 0; i < this.state.quizzes.length; i++)
      {
        tempQuizzes.push(Quiz({quizName: this.state.quizzes[i]}))
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
                        onPress={() => this.hideDelete()}
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