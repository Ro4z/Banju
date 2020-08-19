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
    backgroundColor: 'rgba(84, 84, 88, 1)',
    position: 'absolute',
    top: 220,
  },
});
