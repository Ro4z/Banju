import React from 'react';
import {StyleSheet, View} from 'react-native';

const NoteLine = ({xPos}) => {
  return <View style={[styles.mainContainer, {left: xPos}]} />;
};

export default NoteLine;

const styles = StyleSheet.create({
  mainContainer: {
    width: 1,
    height: 400,
    backgroundColor: 'white',
    position: 'absolute',
    top: 220,
  },
});
