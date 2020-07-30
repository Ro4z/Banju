import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Game from '../components/game';

const Practice = () => {
  return (
    <View style={styles.mainContainer}>
      <Game />
    </View>
  );
};

export default Practice;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
});
