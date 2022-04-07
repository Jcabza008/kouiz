import React from "react";
import { View, Text} from "react-native";
import Swiper from 'react-native-swiper'


export default class Home extends React.Component {

    render()
    {
      return(
      <View style = {{flex: 1}}>
        <View style = {{flex: 1, justifyContent: 'space-between'}}>
          <Text> History</Text>
        </View>
        <View style={{flex: 8, justifyContent: 'center' }}>
          <Swiper showsButtons={false}>
            <View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginTop: 200}}>Quiz 1</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginTop: 200}}>Quiz 2</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', marginTop: 200}}>Quiz 3</Text>
            </View>
          </Swiper>
        </View>
      </View>
      );
    }
  }