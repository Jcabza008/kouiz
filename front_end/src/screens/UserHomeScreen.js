import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';

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
        //options={{iconName: DrawerItems[i].iconType}, {iconType: DrawerItems[i].iconType}}
        component={UserMenu[i].component}/>)
    }
    return(
      <Drawer.Navigator 
      drawerType="front"
      initialRouteName="UserHomeScreenDefault"
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
    iconType:'Material',
    iconName:'face-profile',
    component: Home
  },
  {
    name:'Profile',
    iconType:'Feather',
    iconName:'settings',
    component: Profile
  },
  {
    name:'Create',
    iconType:'Feather',
    iconName:'settings',
    component: Create
  },
  {
    name:'Quizzes',
    iconType:'Material',
    iconName:'bookmark-check-outline',
    component: Quizzes
  }
]