import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import Practice from './src/screens/Practice';
import UserInfo from './src/screens/UserInfo';
import Search from './src/screens/Search';

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
      <Stack.Navigator initialRouteName="Home">
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
        <Stack.Screen name="UserInfo" component={UserInfo} />
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
