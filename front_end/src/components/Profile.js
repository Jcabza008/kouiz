import React from "react";
import { View, Text, StyleSheet} from "react-native";



export default class Profile extends React.Component {
    render()
    {
      return(
        <View style = {{flex: 1, backgroundColor: '#FBFBFD'}}>
          <View style = {{flex: 3, alignItems: 'center'}}>
            <View style = {{width: 122, height: 122, borderRadius: 122/2, borderColor: 'black', borderWidth: 2, marginTop: 20}}>
            </View>
          </View>
          <View style = {{flex: 1, alignItems: 'center', marginBottom: 50, borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 30, marginRight: 30, marginBottom: 20}}>
            <Text style = {{fontSize: 30}}>Username</Text>
          </View>
          <View style={{flex: 8, justifyContent: 'center',  alignItems: 'center'}}>
          </View>
      </View>
      );
    }
  }