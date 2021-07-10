import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ISLocation from './screens/ISLocation'
import Meteor from './screens/Meteor'
import Home from './screens/Home'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';



const Stack = createStackNavigator();
export default function App() {  

    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Home" screenOptions = {{headerShown : false}}>
            <Stack.Screen name = "Home" component = {Home}
            
            />

            <Stack.Screen name = "ISLocation" component = {ISLocation}
            
            />  

            <Stack.Screen name = "Meteor" component = {Meteor}
            
            />
          </Stack.Navigator>
          
        </NavigationContainer>
        
    );
    
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
