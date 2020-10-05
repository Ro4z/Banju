import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Orientation from 'react-native-orientation';

import {BACKGROUND_COLOR} from '@constants/color';
import Header from '@components/practice/phone/Header';

const ChordTableMode = ({navigation}) => {
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />
    </View>
  );
};

export default ChordTableMode;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
