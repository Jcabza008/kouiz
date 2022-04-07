import React from "react";
import { View, Text, TextInput} from "react-native";

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class QuizEditor extends React.Component {
    constructor(){
      super();
      this.state = {
        quizName: 'Quiz Name',
        editName: true
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
  
    render()
    {
      let quizNameStatus;
      if (this.state.editName == true)
      {
        quizNameStatus=
          <View style = {{flexDirection: "row",}}>
            <View style = {{flex: 6}}>
              <Text style = {{fontSize: 30, borderWidth: 1, borderColor: "black", paddingHorizontal: 10}}>{this.state.quizName}</Text>
            </View>
            <View style = {{flex: 1}}>
              <FeatherIcon onPress={this.onPressEditIcon} name = "edit" size = {30} color = "red" style = {{margin: 10}}></FeatherIcon>
            </View>
          </View>
      }
      if (this.state.editName == false)
      {
        quizNameStatus=
          <View style = {{flex: 1, paddingHorizontal: 20, paddingVertical: 60}}>
            <TextInput onChangeText={quizName => this.setState({quizName: quizName})} style = {{fontSize: 30, borderWidth: 1, borderColor: "black", paddingHorizontal: 10}}>{this.state.quizName}</TextInput>
            <Ionicons onPress={this.onPressFinishEdit} name = "checkmark-circle-outline" size = {20} color = "green" style = {{margin: 10}}></Ionicons>
          </View>
      }
  
      return(
        <View style = {{flex: 1}}>
          <View style = {{flex: 1, marginLeft: 20, marginTop: 60}}>
            {quizNameStatus}
          </View>
          <View style = {{flex: 6, flexDirection: "row", marginLeft: 10, marginRight: 10, marginBottom: 40}}>
            <View style = {{flex: 1, borderWidth: 1, marginRight: 3}}>
              <TextInput placeholder="Enter Question"></TextInput>
            </View>
            <View style = {{flex: 1, borderWidth: 1, marginLeft: 3}}>
              <TextInput placeholder="Enter Answer"></TextInput>
            </View>
          </View>
        </View>
      );
    }
  }
