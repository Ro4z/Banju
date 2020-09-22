import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/scenes/Home';
import Practice from './src/scenes/Practice';
import Profile from './src/scenes/Profile';
import Search from './src/scenes/Search';

import {NAVIGATION_BAR_COLOR} from './src/constants/color';

const Stack = createStackNavigator();
const screenDefaultOptions = {
  headerShown: false,
};
const App = () => {
  return (
    <NavigationContainer>
      {/* hide status bar */}
      <StatusBar hidden />
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Home"
          component={Home}
          options={screenDefaultOptions}
        />
        <Stack.Screen
          name="Practice"
          component={Practice}
          options={screenDefaultOptions}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: '개인 프로필',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {backgroundColor: NAVIGATION_BAR_COLOR},
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: NAVIGATION_BAR_COLOR,
              borderWidth: 0.5,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
