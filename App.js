import React, {useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import SplashScreen from 'react-native-splash-screen';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';

import Main_iPad from '@scenes/Main/iPad';
import Main_iPhone from '@scenes/Main/iPhone';
import Practice from '@scenes/Practice';
import Profile from '@scenes/Profile';
import Search from '@scenes/Search';
import Welcome from '@scenes/Welcome';
import SignIn from '@scenes/SignIn';

import {NAVIGATION_BAR_COLOR, colors} from '@constants/color';
import {WIDTH} from '@constants/dimensions';
import Ionicons from '@assets/icon/Ionicons';

EStyleSheet.build({$rem: WIDTH / 380});
const Stack = createStackNavigator();
const screenDefaultOptions = {
  headerShown: false,
};

StatusBar.setTranslucent(true);
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      {/* auto hidden home indicator (iPhone X later) */}
      <PrefersHomeIndicatorAutoHidden />
      {/* hide status bar */}
      {Platform.isPad && <StatusBar hidden />}
      {Platform.OS === 'ios' && (
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
      )}
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Main"
          component={Platform.isPad ? Main_iPad : Main_iPhone}
          options={screenDefaultOptions}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={screenDefaultOptions}
        />
        <Stack.Screen
          name="Practice"
          component={Practice}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={screenDefaultOptions}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={screenDefaultOptions}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
