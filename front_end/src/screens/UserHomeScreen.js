import React from "react";
import { View } from "react-native";

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Home from "../components/Home"
import Profile from "../components/Profile"
import Create from "../components/Create"
import Quizzes from "../components/Quizzes"

const Drawer = createDrawerNavigator();

export default class UserHomeScreen extends React.Component {

  render(){
    let DrawerScreens = []
    for (var i = 0; i < UserMenu.length; i++)
    {
      DrawerScreens.push(<Drawer.Screen 
        name={UserMenu[i].name} 
        drawerIcon={<FeatherIcon name = {UserMenu[i].iconName}> </FeatherIcon>}
        component={UserMenu[i].component}/>)
    }
    return(
      <Drawer.Navigator 
      drawerType="front"
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
        backgroundColor: 'orange',
        width: 240,
        },
      }}
      drawerContent={props => {
        return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={() => props.navigation.navigate('MainHome')} />
            </DrawerContentScrollView>
        )
      }}
      >
        {DrawerScreens}
      </Drawer.Navigator>
    );
  }
}

var UserMenu = [
  {
    name:'Home',
    component: Home
  },
  {
    name:'Profile',
    component: Profile
  },
  {
    name:'Create',
    component: Create
  },
  {
    name:'Quizzes',
    component: Quizzes
  }
]