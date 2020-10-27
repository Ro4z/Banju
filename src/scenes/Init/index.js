import React, { useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { BACKGROUND_COLOR } from '@constants/color';
import { observer } from 'mobx-react-lite';
import SplashScreen from 'react-native-splash-screen';

const Loading = observer(({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
    const getToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    };

    setTimeout(() => {
      const userToken = getToken();
      if (userToken === null) {
        navigation.navigate('Welcome');
      } else {
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
