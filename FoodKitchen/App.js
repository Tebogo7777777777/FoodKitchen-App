import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./screens/HomePage";
import MenuScreen from "./screens/MenuScreen.js";


  const Stack = createNativeStackNavigator();


  export default function App () {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
        name="HomePage"
        component={HomePage} 
        options={{ headerShown: false }}
      />

        <Stack.Screen // Menu screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ title: 'Menu' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
