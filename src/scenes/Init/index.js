import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { observer } from 'mobx-react-lite';

import { BACKGROUND_COLOR } from '@constants/color';

const Loading = observer(({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();

    setTimeout(async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken);
      if (userToken === null) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('Main');
      }
    }, 500);
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
