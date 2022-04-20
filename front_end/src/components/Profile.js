import React from "react";
import { View, Text, StyleSheet} from "react-native";



export default class Profile extends React.Component {
    render()
    {
        return(
            <View style = {{flex: 1, backgroundColor: 'white'}}>
                <View style = {{flex: 2, alignItems: 'center', marginBottom: 20}}>
                    <View style = {{width: 122, height: 122, borderRadius: 122/2, borderColor: 'black', borderWidth: 2, marginTop: 20}}>
                    </View>
                </View>
                <View style = {{flex: 1, alignItems: 'center', marginBottom: 50, borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 30, marginRight: 30, marginBottom: 20}}>
                    <Text style = {{fontSize: 30}}>StevenHu9</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>Username</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>StevenHu9</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>First Name</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>Steven</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>Last Name</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>Hu</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>About</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>Privacy Policy</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>Version</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>0.30.0</Text>
                </View>
            </View>
        );
    }
  }