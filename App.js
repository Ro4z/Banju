import React, { useState, useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import SplashScreen from 'react-native-splash-screen';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';

import iPadMain from '@scenes/Main/iPad';
import iPhoneMain from '@scenes/Main/iPhone';
import Practice from '@scenes/Practice';
import Profile from '@scenes/Profile';
import Search from '@scenes/Search';
import Welcome from '@scenes/Welcome';
import SignIn from '@scenes/SignIn';
import Init from '@scenes/Init';

import { WIDTH } from '@constants/dimensions';

EStyleSheet.build({ $rem: WIDTH / 380 });
const Stack = createStackNavigator();
const screenDefaultOptions = {
  headerShown: false,
};

StatusBar.setTranslucent(true);
const App = () => {
  return (
    <NavigationContainer>
      {/* auto hidden home indicator (iPhone X later) */}
      <PrefersHomeIndicatorAutoHidden />
      {/* hide status bar */}
      {Platform.isPad && <StatusBar hidden />}
      {Platform.OS === 'ios' && (
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      )}
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen name="Init" component={Init} options={screenDefaultOptions} />
        <Stack.Screen name="Welcome" component={Welcome} options={screenDefaultOptions} />
        <Stack.Screen
          name="Main"
          component={Platform.isPad ? iPadMain : iPhoneMain}
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
        <Stack.Screen name="SignIn" component={SignIn} options={screenDefaultOptions} />
        <Stack.Screen name="Profile" component={Profile} options={screenDefaultOptions} />
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
