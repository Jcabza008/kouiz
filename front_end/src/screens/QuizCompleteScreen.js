import React from "react";
import { View, Text, StyleSheet} from "react-native";

import AppButton from "../components/AppButton"


export default class QuizComplete extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            correctAnswers: props.route.params.correctAnswers,
            wrongAnswers: props.route.params.wrongAnswers
        }
      }

    onpressButton = () =>
    {
        this.props.navigation.navigate('Quiz');
    }


    render()
    {
    return(
      <View style = {{flex: 1}}>
        <View style = {{flex: 5, alignItems: 'center', marginTop: 100}}>
            <View style={{flex: 1, width: 350, height: 350, borderWidth: 2, borderColor: 'black', marginBottom: 20, backgroundColor: 'white', elevation: 20}}>
              <View style = {{padding: 20}}>
                <Text style = {{fontSize: 25, color: 'black'}}>Correct Answers:</Text>
                <Text style = {{fontSize: 22, color: 'green', marginTop: 10}}>{this.state.correctAnswers}</Text>
                <Text style = {{fontSize: 25, color: 'black', marginTop: 20}}>Wrong Answers:</Text>
                <Text style = {{fontSize: 22, color: 'red', marginTop: 10}}>{this.state.wrongAnswers}</Text>
              </View>
            </View>
          </View>
        <View style = {{flex: 2, alignItems: 'center', marginTop: 10, justifyContent: 'center'}}>
          <AppButton AppButton title="Done" style={styles.ok_button} onPress={this.onPessButton}></AppButton>
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
    ok_button: {
        borderRadius: 100,
        backgroundColor: 'white',
        width: 150,
        borderWidth: 1,
        borderColor: 'red',
        padding: 20
      },
  });