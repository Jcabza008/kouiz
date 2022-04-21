import React from "react";
import { View, Text, StyleSheet} from "react-native";



export default class Profile extends React.Component {
    state = {
        userinfo: {}
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
    }

    render() {
        return(
            <View style = {{flex: 1, backgroundColor: 'white'}}>
                <View style = {{flex: 2, alignItems: 'center', marginBottom: 20}}>
                    <View style = {{width: 122, height: 122, borderRadius: 122/2, borderColor: 'black', borderWidth: 2, marginTop: 20}}>
                    </View>
                </View>

                <View style = {{flex: 1, alignItems: 'center', marginBottom: 50, borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 30, marginRight: 30, marginBottom: 20}}>
                    <Text style = {{fontSize: 30}}>{this.state.userinfo.username}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>Username</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>{this.state.userinfo.username}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>First Name</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>{this.state.userinfo.firstname}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center', marginLeft: 15, marginRight: 15, marginBottom: 10, backgroundColor: "#F1F1F1"}}>
                    <Text style = {{fontSize: 18, color: 'blue', marginLeft: 20}}>Last Name</Text>
                    <Text style = {{fontSize: 15, marginLeft: 20}}>{this.state.userinfo.lastname}</Text>
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
    };
}