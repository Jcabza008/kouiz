import React from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import Swiper from 'react-native-swiper'

import AppButton from "../components/AppButton.js";

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        quizzes: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"]
      }
    }

    onPressEdit = () =>
    {
      this.props.navigation.navigate('QuizEditor')
    }

    render()
    {
      let tempQuizzes = []
      var Quiz = ({quizName}) => (
        <View style = {{alignItems: 'center'}}>
          <View style={{width: 300, height: 300, borderWidth: 2, borderColor: 'black', backgroundColor: 'white', marginLeft: 40, marginRight: 40}}>
              <View style = {{flex: 2}}>
                <Text style = {{marginTop: 30, marginLeft: 35, marginRight: 35, fontWeight: 'bold', fontSize: 30}}>{quizName}</Text>
              </View>
              <View style = {{flex: 1, borderTopColor: "black", borderTopWidth: 2, marginLeft: 20, marginRight: 20, flexDirection: "row"}}>
              <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                <AppButton title = "Quiz" style={styles.quiz_button}/>
              </View>
              <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 20}}>
                <AppButton title = "Edit" style={styles.quiz_button} onPress = {this.onPressEdit}/>
              </View>
            </View>
          </View>
        </View>
      );
  
      for (var i = 0; i < this.state.quizzes.length; i++)
      {
        tempQuizzes.push(Quiz({quizName: this.state.quizzes[i]}))
      }

      return(
      <View style = {{flex: 1, backgroundColor: '#FBFBFD'}}>
        <View style = {{flex: 3, justifyContent: "center"}}>
          <Text style = {{textAlign: "center", fontSize: 15}}>Welcome back, Username!</Text>
        </View>
        <View style = {{flex: 3, justifyContent: "center"}}>
          <Text style = {{textAlign: "center", fontSize: 30}}>Recent Quizzes</Text>
        </View>
        <View style={{flex: 8, justifyContent: 'center',  alignItems: 'center', padding: 20}}>
          <ScrollView horizontal = {true}>
                {tempQuizzes}
          </ScrollView>
        </View>
      </View>
      );
    }
  }

  
  const styles = StyleSheet.create({
    quiz_button: {
      borderRadius: 200,
      height: 40,
      width: 100,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'blue',
    }
  });