import React from 'react';
import {StyleSheet, View} from 'react-native';

const MatchLine = ({xPos}) => {
  return <View style={[styles.mainContainer, {left: xPos}]} />;
};

export default MatchLine;

const styles = StyleSheet.create({
  mainContainer: {
    width: 10,
    height: '100%',
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: -1,
  },
});
