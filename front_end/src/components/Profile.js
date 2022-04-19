import React from "react";
import { View, Text, StyleSheet} from "react-native";



export default class Profile extends React.Component {

    render()
    {
      return(
        <View style = {{flex: 1, backgroundColor: 'lightskyblue'}}>
          <View style = {{flex: 3, justifyContent: "center", marginBottom: 50, borderBottomColor: 'black', borderBottomWidth: 5, marginLeft: 50, marginRight: 50}}>
            <Text style = {{fontSize: 40, fontFamily: 'sans-serif', textShadowColor: "grey", textShadowRadius: 20, marginLeft: 20, }}>Profile</Text>
          </View>
          <View style={{flex: 8, justifyContent: 'center',  alignItems: 'center'}}>
          </View>
      </View>
      );
    }
  }
  