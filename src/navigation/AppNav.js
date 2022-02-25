import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SelectLanguage from '../screens/SelectLanguage';
import ProvideFeedback from '../screens/ProvideFeedback';


const Stack = createNativeStackNavigator();

export default function AppNav() {
  return (
    
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen name="ProvideFeedback" component={ProvideFeedback} />
      </Stack.Navigator>
    
  );
}