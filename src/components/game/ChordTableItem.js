import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChordTableItem = ({chord, prev, cur, next}) => {
  return (
    <View style={styles.mainContainer}>
      <Text
        style={[
          styles.text,
          {
            color: cur ? 'white' : 'rgba(128,128,128,0.2)',
          },
        ]}>
        {chord}
      </Text>
    </View>
  );
};

export default ChordTableItem;

const styles = StyleSheet.create({
  mainContainer: {
    width: 100,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
});
