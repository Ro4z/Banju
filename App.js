import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Practice from './src/screens/Practice';

const Stack = createStackNavigator();
const screenDefaultOptions = {
  headerShown: false,
};
const App = () => {
  return (
    <NavigationContainer>
      {/* hide status bar */}
      <StatusBar hidden />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={screenDefaultOptions}
        />
        <Stack.Screen name="Practice" component={Practice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
