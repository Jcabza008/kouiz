import React from "react";
import { View, Text, ScrollView, SafeAreaView} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Quizzes extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        quizzes: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5",]
      }
    }
  
  
    addNewQuiz = (name) => {
      this.setState(this.state.quizzes.addQuiz(name))
    }
  
    
    render()
    {
      let tempQuizzes = []
      var Quiz = ({quizName}) => (
        <View style={{width: 300, height: 300, borderWidth: 2, borderColor: 'black', marginBottom: 20}}>
            <View style = {{flex: 2}}>
              <Icon name = "delete" size={30} color="red" style = {{marginTop: 10, marginLeft: 260}}></Icon>
              <Text style = {{marginTop: 0, marginLeft: 35, marginRight: 35, fontWeight: 'bold', fontSize: 30}}>{quizName}</Text>
            </View>
            <View style = {{flex: 1, borderTopColor: "black", borderTopWidth: 2, marginLeft: 20, marginRight: 20, flexDirection: "row"}}>
            <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 30}}>
              <Text style = {{}}>Quiz</Text>
            </View>
            <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 30}}>
              <Text style = {{}}>Edit</Text>
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
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
              {tempQuizzes}
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }