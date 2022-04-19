import React from "react";
import { View, Text } from "react-native";

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from "../components/Home"
import Profile from "../components/Profile"
import Create from "../components/Create"
import Quizzes from "../components/Quizzes"

const Drawer = createDrawerNavigator();

export default class UserHomeScreen extends React.Component {

  render(){
    return(
      <Drawer.Navigator 
      drawerType="front"
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
        backgroundColor: 'white',
        width: 240,
        },
      }}
      drawerContent={props => {
        return (
            <DrawerContentScrollView {...props}>
              <View style = {{flex: 1}}>
                <View style = {{backgroundColor: '#FBFBFD'}}>
                  <View style = {{flex: 1, borderBottomWidth: 3, marginRight: 20, marginLeft: 20, marginBottom: 20, paddingVertical: 20, flexDirection: 'row', backgroundColor: '#FBFBFD'}}>
                    <Feather
                      name="user"
                      size={40}
                    />
                    <Text style = {{fontSize: 20, marginLeft: 10, marginTop: 10}}>StevenHu9</Text>
                  </View>
                </View>
                <View>
                  <DrawerItemList {...props} />
                </View>
                <View style = {{flex: 1, justifyContent: 'flex-end'}}>
                  <DrawerItem label='Logout' 
                  onPress={() => props.navigation.navigate('MainHome')} 
                  />
                </View>
              </View>
            </DrawerContentScrollView>
            
        )
      }}
      >
      <Drawer.Screen name="Home" component={Home} 
        options={{
          title: 'Home',
          fontSize: 40, 
          drawerIcon: () => (
           <MaterialCommunityIcons
              name="home"
              size={40}
           />
          ),
       }}
      />
      <Drawer.Screen name="Profile" component={Profile} 
        options={{
          title: 'Profile',
          fontSize: 40, 
          drawerIcon: () => (
           <MaterialCommunityIcons
              name="card-account-details-outline"
              size={40}
           />
          ),
       }}
      />
      <Drawer.Screen name="Create" component={Create} 
        options={{
          title: 'Create',
          fontSize: 40, 
          drawerIcon: () => (
           <MaterialCommunityIcons
              name="plus-circle"
              size={40}
           />
          ),
       }}
      />
      <Drawer.Screen name="Quizzes" component={Quizzes} 
        options={{
          title: 'Quizzes',
          fontSize: 40, 
          drawerIcon: () => (
           <MaterialCommunityIcons
              name="folder-text-outline"
              size={40}
           />
          ),
       }}
      />
      </Drawer.Navigator>
    );
  }
}