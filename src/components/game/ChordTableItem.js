import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChordTableItem = ({chord, cur}) => {
  return (
    <View style={styles.mainContainer}>
      <Text
        style={[styles.text, {color: cur ? 'black' : 'rgba(128,128,128,0.2)'}]}>
        {chord}
      </Text>
    </View>
  );
};

export default ChordTableItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
  },
});
