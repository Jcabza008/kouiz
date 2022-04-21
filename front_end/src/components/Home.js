import React from "react";
import { View, Text, StyleSheet, ScrollView, LogBox} from "react-native";
import Swiper from 'react-native-swiper'
import { default as KMServerClient} from '../services/KMServerClient';

import AppButton from "../components/AppButton.js";

LogBox.ignoreAllLogs();

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userinfo: {},
        quizzes: []
    }
  }

    componentDidMount()
    {
        try {
          KMServerClient.getUserInfo()
          .then(userinfo => {
            this.state.userinfo = userinfo;
          });
        } catch(err) {
            this.props.navigation.navigate("LoginScreen");
        }

        KMServerClient.getQuizzes()
        .then(response => {
            if(response.error != null) {
                console.error(response.error);
            } else {
                this.setState({quizzes: response.response});
            }
        });
    }

    onPressEdit = () =>
    {
      this.props.navigation.navigate('QuizEditor')
    }

    render() {
      var Quiz = ({quizName}) => (
        <View style = {{alignItems: 'center'}}>
          <View style={{width: 300, height: 200, borderWidth: 2, borderColor: 'black', backgroundColor: 'white', marginLeft: 30, marginRight: 40}}>
              <View style = {{flex: 2}}>
                <Text style = {{marginTop: 30, marginLeft: 35, marginRight: 35, fontWeight: 'bold', fontSize: 30}}>
                    {quizName}
                </Text>
              </View>
            <View style = {{flex: 1, borderTopColor: "black", borderTopWidth: 2, marginLeft: 20, marginRight: 20, flexDirection: "row"}}>
              <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 12}}>
                <AppButton
                  title = "Quiz"
                  style={styles.quiz_button}>
                </AppButton>
              </View>

              <View style = {{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 12}}>
                <AppButton
                  title = "Edit"
                  style={styles.quiz_button}
                  onPress = {this.onPressEdit}>
                </AppButton>
              </View>
            </View>
          </View>
        </View>
      );

      let quizzes = [];
      for (var i = 0; i < this.state.quizzes.length; i++)
      {
        quizzes.push(Quiz({quizName: this.state.quizzes[i].name}))
      }

      return(
        <View style = {{flex: 1, backgroundColor: '#FBFBFD'}}>
          <View style = {{flex: 3, justifyContent: "center"}}>
            <Text style = {{textAlign: "center", fontSize: 15}}>Welcome back, {this.state.userinfo.firstname}!</Text>
          </View>

          <View style = {{flex: 3, justifyContent: "center"}}>
            <Text style = {{textAlign: "center", fontSize: 30}}>Recent Quizzes</Text>
          </View>

          <View style={{flex: 8, justifyContent: 'center',  alignItems: 'center', padding: 20}}>
            <ScrollView horizontal = {true}>
                  {quizzes}
            </ScrollView>
          </View>

        </View>
      );
    };
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