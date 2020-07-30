import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Header from '../components/struct/Header';
import {HEIGHT} from '../constants/dimensions';

const Home = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.imgBackground}
        source={require('../assets/img/background_home.jpg')}>
        <Header />
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  imgBackground: {width: '100%', height: HEIGHT / 2},
});
