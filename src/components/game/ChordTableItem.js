import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChordTableItem = ({chord}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{chord}</Text>
    </View>
  );
};

export default ChordTableItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
  },
});
