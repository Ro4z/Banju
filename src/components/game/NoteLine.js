import React from 'react';
import {StyleSheet, View} from 'react-native';

const NoteLine = ({yPos}) => {
  return <View style={[styles.mainContainer, {top: yPos}]} />;
};

export default NoteLine;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: -1,
  },
});
