import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './ChordTableItem';

const ChordTable = ({position, chord}) => {
  const x = position[0];
  const y = position[1];
  const prev = chord[0];
  const cur = chord[1];
  const next = chord[2];

  return (
    <View style={[styles.mainContainer, {left: x, top: y, zIndex: 4}]}>
      <View style={styles.table}>
        <Item chord={prev} />
        <Item chord={cur} cur />
        <Item chord={next} />
      </View>
    </View>
  );
};

export default ChordTable;

const styles = StyleSheet.create({
  mainContainer: {
    width: 200,
    height: 50,
    position: 'absolute',
    zIndex: 3,
  },
  table: {
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});
