import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react-lite';

import { BACKGROUND_COLOR } from '@constants/color';
import TokenStore from '@store/tokenStore';

const Loading = observer(({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      SplashScreen.hide();
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === null) {
        navigation.navigate('Welcome');
      } else {
        TokenStore.setUserToken(userToken);
        navigation.navigate('Main');
      }
    }, 0);
  });
  return <View style={styles.mainContainer} />;
});

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
